// VERCEL WEBSITE: app/api/ai/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// 🚀 FIX 1: Override Vercel's strict 10-second timeout
export const maxDuration = 60; 

// A Helper function to pick a cheap/fast model when VIP limits are exceeded
function getFallbackModel(provider: string) {
    if (provider === 'groq') return 'llama-3.1-8b-instant';
    if (provider === 'openrouter') return 'openai/gpt-4o-mini';
    if (provider === 'cerebras') return 'llama3.1-8b';
    return 'gpt-4o-mini';
}

export async function POST(req: Request) {
  try {
    // 🚀 NEW: Extract userId so we know who is making the request
    const { userId, provider, model, temperature, tokens, systemInstruction, userPrompt } = await req.json();

    // ==========================================
    // LAYER 1: INPUT PROTECTION (The Context Limiter)
    // ==========================================
    // 50,000 characters is roughly 12,000 tokens. Reject anything larger.
    if (typeof userPrompt === 'string' && userPrompt.length > 50000) {
        return NextResponse.json(
            { error: "Context limit exceeded. Please select fewer files or a smaller code snippet." },
            { status: 400 }
        );
    }

    // ==========================================
    // LAYER 2: THE VIP QUOTA TRACKER
    // ==========================================
    // NOTE: Replace these placeholder values with your actual Database query 
    // Example: const user = await db.user.findUnique({ where: { id: userId } });
    let plan = "hobby";
    let monthlyRequests = 0;
    let selectedModel = model;

    if (userId) {
        const users = await sql`
            SELECT plan, monthly_ai_requests 
            FROM users 
            WHERE id = ${userId} 
            LIMIT 1
        `;
        
        if (users.length > 0) {
            plan = users[0].plan;
            monthlyRequests = users[0].monthly_ai_requests;
        }
    }

    if (plan === "hobby" && monthlyRequests >= 50) {
        return NextResponse.json(
            { error: "Free monthly AI limit reached. Please upgrade to Pro." },
            { status: 429 }
        );
    }

    if (plan === "pro" && monthlyRequests >= 500) {
        selectedModel = getFallbackModel(provider);
    }

    // Downgrade Pro users who have burned all 500 VIP Fast Passes
    if (plan === "pro" && monthlyRequests >= 500) {
        selectedModel = getFallbackModel(provider);
        console.log(`User ${userId} exceeded VIP limits. Downgraded to ${selectedModel}.`);
    }

    // ==========================================
    // ROUTING & AUTH CONFIGURATION
    // ==========================================
    let url, apiKey, body;

    // LAYER 3: OUTPUT PROTECTION
    // Force a hard cap of 4096 tokens so a runaway loop doesn't drain your API credits
    const safeOutputTokens = Math.min(tokens || 4096, 4096); 

    if (provider === 'groq') {
      url = 'https://api.groq.com/openai/v1/chat/completions';
      apiKey = process.env.GROQ_API_KEY ?? process.env.GROQ_API_KEY2 ?? process.env.GROQ_API_KEY3 ?? '';
      body = {
        model: selectedModel || 'llama-3.3-70b-versatile',
        temperature: temperature || 0.3,
        max_tokens: safeOutputTokens, 
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    } else if (provider === 'openrouter') {
      url = 'https://openrouter.ai/api/v1/chat/completions';
      apiKey = process.env.API_KEY ?? process.env.API_KEY2 ?? process.env.API_KEY3 ?? '';
      body = {
        model: selectedModel || 'openai/gpt-oss-120b',
        temperature: temperature || 0.3,
        max_tokens: safeOutputTokens, 
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
        model: selectedModel || 'gpt-oss-120b', 
        temperature: temperature || 0.7,
        max_tokens: safeOutputTokens, 
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ]
      };
    }
    else {
      return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
    }

    // ==========================================
    // EXECUTE THE AI REQUEST
    // ==========================================
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

    if (userId) {
        // Increment the count without needing a secondary read query
        await sql`
            UPDATE users 
            SET monthly_ai_requests = monthly_ai_requests + 1,
                updated_at = now()
            WHERE id = ${userId}
        `;
    }

    if (userId) {
        console.log(`Incremented usage for ${userId}`);
    }
    
    // Send the answer back to Electron
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
