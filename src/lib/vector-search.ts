import type { Agent } from '@/data/agents';

/**
 * This is now an empty function as we are no longer loading a model
 * in the browser.
 */
export async function createAgentEmbeddings(agents: Agent[]) {
  // No-op: In the simulated version, we don't need to create embeddings.
  console.log("Skipping AI model initialization for demo mode.");
  return Promise.resolve();
}

/**
 * Finds the best agent match for a given query using simple keyword search.
 * This simulates a fast backend without loading a heavy model.
 */
export async function findBestMatch(query: string, agents: Agent[]): Promise<Agent | null> {
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