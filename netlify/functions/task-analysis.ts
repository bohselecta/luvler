import Anthropic from '@anthropic-ai/sdk';
import { CLINICAL_PROMPTS, selectModel, logTokenUsage, handleAIError } from '@/lib/ai-prompts';

export default async (request: Request) => {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { goal, method = 'backward' } = await request.json();

    if (!goal) {
      return new Response(JSON.stringify({ error: 'Goal data is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = new Anthropic({ apiKey });

    const prompt = CLINICAL_PROMPTS.generateTaskAnalysis(goal, method);
    const model = selectModel('task-breakdown');

    const response = await client.messages.create({
      model,
      max_tokens: 800, // Task analysis typically needs more tokens
      messages: [{ role: 'user', content: prompt }],
    });

    const usage = response.usage;
    if (usage) {
      logTokenUsage({
        inputTokens: usage.input_tokens,
        outputTokens: usage.output_tokens || 0,
        totalTokens: (usage.input_tokens || 0) + (usage.output_tokens || 0),
        model,
        cost: 0, // Will be calculated by frontend
      });
    }

    // Handle different content block types
    let responseText = '';
    if (response.content[0].type === 'text') {
      responseText = response.content[0].text;
    } else {
      responseText = JSON.stringify(response.content[0]);
    }

    return new Response(JSON.stringify({
      success: true,
      data: responseText,
      tokenUsage: usage,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Error in task-analysis function:', error);

    const errorMessage = handleAIError(error);

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};
