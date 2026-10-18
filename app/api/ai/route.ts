import { NextResponse } from 'next/server';
import { sql } from '@/lib/db'; 

// Override Vercel's strict 10-second timeout for long AI generations
export const maxDuration = 60; 

// Fallback logic for when Pro users exhaust their monthly 50,000 credits
function getFallbackModel(provider: string) {
    if (provider === 'cerebras') return 'llama3.1-8b';
    if (provider === 'groq') return 'llama-3.1-8b-instant';
    if (provider === 'openrouter') return 'openai/gpt-4o-mini';
    return 'llama3.1-8b';
}

export async function POST(req: Request) {
  try {
    const frData = await req.json();

    const { userId, provider, model, temperature, tokens, systemInstruction, userPrompt } = frData
    
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: Missing User ID" }, { status: 401 });
    }

    if (typeof userPrompt === 'string' && userPrompt.length > 50000) {
        return NextResponse.json(
            { error: "Context limit exceeded. Please select fewer files." },
            { status: 400 }
        );
    }

    let plan = "hobby";
    let computeCredits = 1000;
    let selectedModel = model;

    const users = await sql`
        SELECT plan, "computeCredits" 
        FROM users 
        WHERE id = ${userId} 
        LIMIT 1
    `;
    
    if (users.length > 0) {
        plan = users[0].plan || "hobby";
        computeCredits = users[0].computeCredits ?? 1000;
    }

    const isPayingCustomer = plan === "pro" || plan === "teams";

    if (computeCredits <= 0) {
        if (!isPayingCustomer) {
            return NextResponse.json(
                { error: "Free compute credits exhausted. Please upgrade to Pro in the dashboard to continue." },
                { status: 402 }
            );
        } else {
            selectedModel = getFallbackModel(provider);
        }
    }

    let url, apiKey, body;
    const safeOutputTokens = Math.min(tokens || 4096, 4096); 
    

    if (isPayingCustomer) {
      url = 'https://api.cerebras.ai/v1/chat/completions';
      
      apiKey = process.env.CEREBRAS_API_KEY;

      body = {
        model: 'gpt-oss-120b', 
        temperature: temperature || 0.7,
        max_tokens: safeOutputTokens, 
        messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPrompt }]
      };
    } 

    else {
        if (provider === 'groq') {
        url = 'https://api.groq.com/openai/v1/chat/completions';
        
        apiKey = process.env.GROQ_API_KEY ?? process.env.GROQ_API_KEY2 ?? process.env.GROQ_API_KEY3 ?? process.env.GROQ_API_KEY4 ?? process.env.GROQ_API_KEY5;
        
        body = {
          model: "openai/gpt-oss-120b",
          temperature: temperature || 0.3,
          max_tokens: safeOutputTokens, 
          messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPrompt }]
        };

      }
      else if (provider === 'openrouter') {
        url = 'https://openrouter.ai/api/v1/chat/completions';
        
        apiKey = process.env.API_KEY ?? process.env.API_KEY2 ?? process.env.API_KEY3; 
        
        body = {
          model: selectedModel == "qwen/qwen3-235b-a22b-thinking-2507" ? "qwen/qwen3-235b-a22b-thinking-2507" : 'openai/gpt-oss-120b',
          temperature: temperature || 0.3,
          max_tokens: safeOutputTokens, 
          messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPrompt }]
        };
      }

      else {
        return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
      }
    }

    if (!apiKey) {
         throw new Error(`Configuration Error: API key for ${provider} is missing from Vercel.`);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Title': 'Vextor AI IDE'
      },
      body: JSON.stringify(body)
    });

    if (response.status === 402) {
      const errorData = await response.json();
      throw new Error(`INSUFFICIENT_CREDITS:${errorData.error}`);
    }


    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`AI Provider Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    let creditsUsed = 0;
    if (computeCredits > 0) {
        const totalTokens = data.usage?.total_tokens || 0;
        creditsUsed = Math.ceil(totalTokens / 100) || 1;

        await sql`
            UPDATE users 
            SET "computeCredits" = GREATEST("computeCredits" - ${creditsUsed}, 0),
                updated_at = now()
            WHERE id = ${userId}
        `;
    }
    
    data.vextor_usage = {
        creditsUsed: creditsUsed,
        creditsRemaining: Math.max(computeCredits - creditsUsed, 0),
        isFallback: computeCredits <= 0
    };

    return NextResponse.json(data, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });

  } catch (error: any) {
    console.error("Vercel AI Route Crash:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}