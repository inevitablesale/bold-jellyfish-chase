export interface Agent {
  id: string;
  name: string;
  description: string;
  skills: string[];
  technologies?: string[];
  source: 'Open Source' | 'N8N' | 'Make.com' | 'Internal';
  author: string;
  version: string;
  outputFormat: 'CSV' | 'JSON' | 'PDF';
  exampleRequest: string;
  price?: number;
  pricingModel?: 'one-time' | 'subscription';
}

export const agents: Agent[] = [
  {
    id: 'lead-gen-1',
    name: 'Lead Generation Bot',
    description: 'Scans public directories and social media to find potential leads based on your criteria.',
    skills: ['Lead Generation', 'Web Scraping', 'Data Analysis'],
    technologies: ['Apify', 'PhantomBuster', 'Google Search'],
    source: 'Open Source',
    author: 'Community',
    version: '1.2.0',
    outputFormat: 'CSV',
    exampleRequest: 'Find me 100 new leads for aisymphony.ai, selling sales AI agents',
    price: 25,
    pricingModel: 'one-time',
  },
  {
    id: 'market-research-1',
    name: 'Market Research Analyst',
    description: 'Analyzes market trends, competitor strategies, and customer sentiment from various data sources.',
    skills: ['Market Research', 'Sentiment Analysis', 'Reporting'],
    technologies: ['Google Maps API', 'OpenAI GPT-4'],
    source: 'Internal',
    author: 'Our Team',
    version: '2.0.1',
    outputFormat: 'PDF',
    exampleRequest: 'Analyze the market for AI-powered sales tools',
    price: 99,
    pricingModel: 'subscription',
  },
  {
    id: 'comfyui-text2img-1',
    name: 'ComfyUI Image Generator',
    description: 'Generates high-quality images from text prompts using a custom Stable Diffusion XL workflow.',
    skills: ['Image Generation', 'Text-to-Image', 'Art', 'Stable Diffusion'],
    technologies: ['ComfyUI', 'Python', 'Stable Diffusion XL'],
    source: 'Open Source',
    author: 'AI Artisans',
    version: '1.0.0',
    outputFormat: 'JSON',
    exampleRequest: 'A photorealistic cat wearing a spacesuit, cinematic lighting',
    price: 2,
    pricingModel: 'one-time',
  },
  {
    id: 'n8n-social-poster',
    name: 'N8N Social Media Poster',
    description: 'An N8N workflow that automatically posts content to multiple social media platforms.',
    skills: ['Social Media', 'Automation', 'Content Management'],
    technologies: ['N8N'],
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
    technologies: ['Make.com', 'Salesforce API', 'HubSpot API'],
    source: 'Make.com',
    author: 'Make.com Templates',
    version: '1.5.0',
    outputFormat: 'JSON',
    exampleRequest: 'Sync new contacts from HubSpot to Salesforce every hour'
  },
];