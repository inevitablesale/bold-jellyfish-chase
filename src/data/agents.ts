export interface Agent {
  id: string;
  name: string;
  description: string;
  skills: string[];
  source: 'Open Source' | 'N8N' | 'Make.com' | 'Internal';
  author: string;
  version: string;
  outputFormat: 'CSV' | 'JSON' | 'PDF';
  exampleRequest: string;
}

export const agents: Agent[] = [
  {
    id: 'lead-gen-1',
    name: 'Lead Generation Bot',
    description: 'Scans public directories and social media to find potential leads based on your criteria.',
    skills: ['Lead Generation', 'Web Scraping', 'Data Analysis'],
    source: 'Open Source',
    author: 'Community',
    version: '1.2.0',
    outputFormat: 'CSV',
    exampleRequest: 'Find me 100 new leads for aisymphony.ai, selling sales AI agents'
  },
  {
    id: 'market-research-1',
    name: 'Market Research Analyst',
    description: 'Analyzes market trends, competitor strategies, and customer sentiment from various data sources.',
    skills: ['Market Research', 'Sentiment Analysis', 'Reporting'],
    source: 'Internal',
    author: 'Our Team',
    version: '2.0.1',
    outputFormat: 'PDF',
    exampleRequest: 'Analyze the market for AI-powered sales tools'
  },
  {
    id: 'n8n-social-poster',
    name: 'N8N Social Media Poster',
    description: 'An N8N workflow that automatically posts content to multiple social media platforms.',
    skills: ['Social Media', 'Automation', 'Content Management'],
    source: 'N8N',
    author: 'N8N Community',
    version: '1.0.0',
    outputFormat: 'JSON',
    exampleRequest: 'Post our new blog article to Twitter and LinkedIn'
  },
  {
    id: 'make-crm-sync',
    name: 'Make.com CRM Sync',
    description: 'A Make.com scenario to sync customer data between HubSpot and Salesforce.',
    skills: ['CRM', 'Data Synchronization', 'API Integration'],
    source: 'Make.com',
    author: 'Make.com Templates',
    version: '1.5.0',
    outputFormat: 'JSON',
    exampleRequest: 'Sync new contacts from HubSpot to Salesforce every hour'
  },
];