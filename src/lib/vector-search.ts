import type { Agent } from '@/data/agents';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { showError } from '@/utils/toast';

const API_KEY_STORAGE_KEY = 'gemini-api-key';

/**
 * Finds the best agent match for a given query.
 * It first tries to use the Gemini API if a key is available in local storage.
 * If not, it falls back to a simple local keyword search.
 */
export async function findBestMatch(query: string, agents: Agent[]): Promise<Agent | null> {
  const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);

  if (apiKey) {
    try {
      return await findBestMatchWithGemini(query, agents, apiKey);
    } catch (error) {
      console.error("Gemini API call failed:", error);
      showError("Gemini API failed. Falling back to local search.");
      return findBestMatchWithKeywords(query, agents);
    }
  } else {
    console.log("No API key found. Using local keyword search.");
    return findBestMatchWithKeywords(query, agents);
  }
}

/**
 * Uses the Gemini API to find the best agent.
 */
async function findBestMatchWithGemini(query: string, agents: Agent[], apiKey: string): Promise<Agent | null> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const simplifiedAgents = agents.map(a => ({
    id: a.id,
    name: a.name,
    description: a.description,
    skills: a.skills,
  }));

  const prompt = `
    You are an expert AI agent router. Your task is to find the best agent to fulfill a user's request from a given list.

    User Request: "${query}"

    Available Agents (in JSON format):
    ${JSON.stringify(simplifiedAgents, null, 2)}

    Analyze the user request and the available agents. Respond with ONLY the JSON object of the single best matching agent. For example: {"id": "some-agent-id"}. Do not add any other text, explanation, or markdown formatting. If no agent is a good match, respond with {"id": null}.
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  // Clean up the response to extract only the JSON part
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Invalid response format from Gemini API.");
  }
  
  const parsedResponse = JSON.parse(jsonMatch[0]);
  const bestAgentId = parsedResponse.id;

  if (!bestAgentId) {
    return null;
  }

  return agents.find(agent => agent.id === bestAgentId) || null;
}

/**
 * Finds the best agent match for a given query using simple keyword search.
 */
function findBestMatchWithKeywords(query: string, agents: Agent[]): Agent | null {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if (queryWords.length === 0) return null;

  let bestMatch: Agent | null = null;
  let bestScore = 0;

  agents.forEach(agent => {
    const agentText = `
      ${agent.name} 
      ${agent.description} 
      ${agent.skills.join(' ')} 
      ${agent.technologies?.join(' ') || ''}
    `.toLowerCase();

    let currentScore = 0;
    queryWords.forEach(word => {
      if (agentText.includes(word)) {
        currentScore++;
      }
    });

    if (currentScore > bestScore) {
      bestScore = currentScore;
      bestMatch = agent;
    }
  });

  return bestMatch;
}