// VERCEL WEBSITE: app/api/ai/route.ts
import { NextResponse } from 'next/server';

// 🚀 FIX 1: Override Vercel's strict 10-second timeout
export const maxDuration = 60; 

export async function POST(req: Request) {
  try {
    const { provider, model, temperature, tokens, systemInstruction, userPrompt } = await req.json();
    let url, apiKey, body;

    // 1. Configure based on provider
    if (provider === 'groq') {
      url = 'https://api.groq.com/openai/v1/chat/completions';
      apiKey = process.env.GROQ_API_KEY ?? process.env.GROQ_API_KEY2 ?? process.env.GROQ_API_KEY3 ?? '';
      body = {
        model: model || 'llama-3.3-70b-versatile',
        temperature: temperature || 0.3,
        max_tokens: tokens || 6000,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    } else if (provider === 'openrouter') {
      url = 'https://openrouter.ai/api/v1/chat/completions';
      apiKey = process.env.API_KEY ?? process.env.API_KEY2 ?? process.env.API_KEY3 ?? '';
      body = {
        model: model || 'openai/gpt-oss-120b',
        temperature: temperature || 0.3,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    }
    else if (provider === 'cerebras') {
      url = 'https://api.cerebras.ai/v1/chat/completions';
      apiKey = process.env.CEREBRAS_API_KEY;
      body = {
        model: 'gpt-oss-120b', 
        temperature: temperature || 0.7,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    }
    else {
      return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
    }

    // 2. Fetch from the AI provider
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Title': 'Vextor AI IDE'
      },
      body: JSON.stringify(body)
    });

    // 🚀 FIX 2: Catch the EXACT error string from Groq/OpenRouter
    if (!response.ok) {
      const errorText = await response.text(); 
      console.error(`[${provider.toUpperCase()}] Provider Error:`, errorText);
      throw new Error(`AI Provider Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    // 3. Send the answer back to Electron
    return NextResponse.json(data, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });

  } catch (error: any) {
    console.error("🔥 Vercel AI Route Crash:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}