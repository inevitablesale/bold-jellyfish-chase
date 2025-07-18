import { pipeline, cos_sim } from '@xenova/transformers';
import type { Agent } from '@/data/agents';

// This is a singleton instance. We'll load the model only once.
let extractor: any = null;

async function getPipeline() {
  if (extractor === null) {
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return extractor;
}

// We'll store the agent embeddings in memory to avoid re-calculating them.
let agentEmbeddings: { id: string; embedding: any }[] = [];

/**
 * Converts all agents' text descriptions into numerical vectors (embeddings).
 * This is the "indexing" step.
 */
export async function createAgentEmbeddings(agents: Agent[]) {
  if (agentEmbeddings.length > 0) {
    return; // Already created
  }

  const extractor = await getPipeline();
  
  // Combine the most important text fields into a single string for each agent.
  const textsToEmbed = agents.map(agent => 
    `Agent Name: ${agent.name}. Description: ${agent.description}. Skills: ${agent.skills.join(', ')}.`
  );

  const embeddings = await extractor(textsToEmbed, { pooling: 'mean', normalize: true });

  agentEmbeddings = agents.map((agent, i) => ({
    id: agent.id,
    embedding: embeddings[i].data,
  }));
  
  console.log("Agent embeddings created successfully.");
}

/**
 * Finds the best agent match for a given query using vector similarity.
 * This is the "search" step.
 */
export async function findBestMatch(query: string, agents: Agent[]): Promise<Agent | null> {
  if (agentEmbeddings.length === 0) {
    // Ensure embeddings are created if they haven't been already.
    await createAgentEmbeddings(agents);
  }

  const extractor = await getPipeline();
  
  // Generate an embedding for the user's query.
  const queryEmbedding = await extractor(query, { pooling: 'mean', normalize: true });

  let bestMatch = { id: null as string | null, score: -1 };

  // Compare the query embedding with each agent's embedding.
  for (const agentEmbedding of agentEmbeddings) {
    const score = cos_sim(queryEmbedding.data, agentEmbedding.embedding);
    if (score > bestMatch.score) {
      bestMatch = { id: agentEmbedding.id, score };
    }
  }

  // Return the full agent object if the match is good enough.
  if (bestMatch.id && bestMatch.score > 0.3) { // A threshold to prevent poor matches.
    return agents.find(agent => agent.id === bestMatch.id) || null;
  }

  return null;
}