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
    const { userId, provider, model, temperature, tokens, systemInstruction, userPrompt } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: Missing User ID" }, { status: 401 });
    }

    // Input Protection against massive malicious payloads
    if (typeof userPrompt === 'string' && userPrompt.length > 50000) {
        return NextResponse.json(
            { error: "Context limit exceeded. Please select fewer files." },
            { status: 400 }
        );
    }

    // 1. Fetch user subscription status & credits from Neon DB
    let plan = "hobby";
    let computeCredits = 0;
    let selectedModel = model;

    const users = await sql`
        SELECT plan, compute_credits 
        FROM users 
        WHERE id = ${userId} 
        LIMIT 1
    `;
    
    if (users.length > 0) {
        plan = users[0].plan;
        computeCredits = users[0].compute_credits;
    }

    const isPayingCustomer = plan === "pro" || plan === "teams";

    // 2. Enforce Credit Limits
    if (computeCredits <= 0) {
        if (!isPayingCustomer) {
            // Free users get blocked completely when they hit 0
            return NextResponse.json(
                { error: "Free compute credits exhausted. Please upgrade to Pro in the dashboard to continue." },
                { status: 402 } // 402 Payment Required
            );
        } else {
            // Paid users get shifted to the unlimited "Slow Lane" free models instead of being blocked
            selectedModel = getFallbackModel(provider);
        }
    }

    // ==========================================
    // 3. ROUTING & SECURE API KEY ASSIGNMENT
    // ==========================================
    let url, apiKey, body;
    const safeOutputTokens = Math.min(tokens || 4096, 4096); 

    if (provider === 'cerebras') {
      url = 'https://api.cerebras.ai/v1/chat/completions';
      
      // 🚀 THE CEREBRAS MASTER SWITCH
      // Paying users get the massive Paid Key. Free users get the Free Key.
      apiKey = isPayingCustomer 
          ? process.env.PAID_CEREBRAS_KEY 
          : process.env.CEREBRAS_API_KEY;

      body = {
        model: selectedModel || 'gpt-oss-120b', 
        temperature: temperature || 0.7,
        max_tokens: safeOutputTokens, 
        messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPrompt }]
      };

    } else if (provider === 'groq') {
      url = 'https://api.groq.com/openai/v1/chat/completions';
      
      // 🛡️ Free Use Shield: Groq requests always route through free keys to protect your wallet
      apiKey = process.env.FREE_GROQ_API_KEY ?? process.env.GROQ_API_KEY2 ?? process.env.GROQ_API_KEY3;
      
      body = {
        model: selectedModel || 'llama-3.3-70b-versatile',
        temperature: temperature || 0.3,
        max_tokens: safeOutputTokens, 
        messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPrompt }]
      };

    } else if (provider === 'openrouter') {
      url = 'https://openrouter.ai/api/v1/chat/completions';
      
      // 🛡️ Free Use Shield: OpenRouter requests always route through free keys
      apiKey = process.env.API_KEY ?? process.env.API_KEY2 ?? process.env.API_KEY3; 
      
      body = {
        model: selectedModel || 'openai/gpt-oss-120b',
        temperature: temperature || 0.3,
        max_tokens: safeOutputTokens, 
        messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userPrompt }]
      };

    } else {
      return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
    }

    if (!apiKey) {
         throw new Error(`Configuration Error: API key for ${provider} is missing from Vercel.`);
    }

    // 4. Execute the AI Request securely from the Backend
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Title': 'Vextor AI IDE' // Identifies your app to the AI providers
      },
      body: JSON.stringify(body)
    });

    if (response.status === 402) {
      const errorData = await response.json();
      // Throw a specific error flag so the React frontend inside Electron can show an "Upgrade to Pro" modal
      throw new Error(`INSUFFICIENT_CREDITS:${errorData.error}`);
    }


    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`AI Provider Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    // 5. Deduct Compute Credits (1 credit = 100 tokens)
    let creditsUsed = 0;
    
    if (computeCredits > 0) {
        const totalTokens = data.usage?.total_tokens || 0;
        creditsUsed = Math.ceil(totalTokens / 100) || 1;

        await sql`
            UPDATE users 
            SET compute_credits = GREATEST(compute_credits - ${creditsUsed}, 0),
                updated_at = now()
            WHERE id = ${userId}
        `;
    }
    
    // 6. Attach usage stats for the Vextor IDE Frontend UI
    data.vextor_usage = {
        creditsUsed: creditsUsed,
        creditsRemaining: Math.max(computeCredits - creditsUsed, 0),
        isFallback: computeCredits <= 0
    };

    // Return the generated code to the user's desktop app
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