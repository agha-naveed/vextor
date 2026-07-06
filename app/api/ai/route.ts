// VERCEL WEBSITE: app/api/ai/route.js
import { NextResponse } from 'next/server';

export async function POST(req:Request) {
  try {
    const { provider, model, systemInstruction, userPrompt } = await req.json();
    let url, apiKey, body;

    // 1. Configure based on provider
    if (provider === 'groq') {
      url = 'https://api.groq.com/openai/v1/chat/completions';
      // VERCEL CAN SECURELY READ THESE ENV VARIABLES! 🚀
      apiKey = process.env.GROQ_API_KEY || process.env.GROQ_API_KEY2;
      body = {
        model: model || 'llama-3.3-70b-versatile',
        temperature: 0.3,
        max_tokens: 6000,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    } else if (provider === 'cerebras') {
      url = 'https://api.cerebras.ai/v1/chat/completions';
      apiKey = process.env.CEREBRAS_API_KEY;
      body = {
        model: 'gpt-oss-120b',
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    } else {
      return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
    }

    // 2. Fetch from the AI provider
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`AI API Error: ${response.statusText}`);
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

  } catch (error:any) {
    console.error("Vercel AI Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}