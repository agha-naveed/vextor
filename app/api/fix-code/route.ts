import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Connect to your native Vercel Redis database using your pulled connection string
const redis = new Redis(process.env.KV_REDIS_URL as string);

export async function POST(request: Request) {
  try {
    const { userId, provider, model, systemInstruction, userPrompt } = await request.json();

    // 1. Guard against unauthorized requests
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: Missing User Identification" }, { status: 401 });
    }

    // 2. Vercel Redis Daily Rate Limiter (Max 50 requests per calendar day)
    const today = new Date().toISOString().split('T')[0];
    const rateLimitKey = `user:${userId}:ratelimit:${today}`;
    const DAILY_LIMIT = 50;

    const currentRequests = Number(await redis.get(rateLimitKey)) || 0;

    if (currentRequests >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: `Rate limit exceeded. You have used your ${DAILY_LIMIT} free daily AI fixes.` },
        { status: 429 }
      );
    }

    // Increment count and establish 24-hour expiration window on first daily run
    await redis.incr(rateLimitKey);
    if (currentRequests === 0) {
      await redis.expire(rateLimitKey, 86400);
    }

    // 3. Dynamic Configuration based on the requested provider
    let url = '';
    let apiKey = '';
    let body = {};

    if (provider === 'groq') {
      url = 'https://api.groq.com/openai/v1/chat/completions';
      apiKey = process.env.GROQ_API_KEY ?? process.env.GROQ_API_KEY2 ?? process.env.GROQ_API_KEY3 ?? '';
      body = {
        model: model ?? 'llama-3.1-70b-versatile',
        temperature: 0.3,
        max_tokens: 6000,
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
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    } else if (provider === 'cerebras') {
      url = 'https://api.cerebras.ai/v1/chat/completions';
      apiKey = process.env.CEREBRAS_API_KEY ?? '';
      body = {
        model: model || 'llama3.1-8b', // Updated to ensure a fallback default model exists
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    } else {
      return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
    }

    // 4. Securely call the upstream AI provider from Vercel
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://vextor.vercel.app',
        'X-Title': 'Vextor AI IDE'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Upstream Provider Error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const fixedCode = data.choices?.[0]?.message?.content || "";

    // 5. Return response to Electron
    return NextResponse.json({ fixedCode }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error: any) {
    console.error("Vercel Proxy Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}