import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db'; 

// 🚀 Add searchParams to the page component
export default async function AuthSuccessPage({ searchParams }: { searchParams: { origin?: string } }) {
    let user;

    try {
        user = await currentUser();
    } catch (error) {
        console.error("Clerk API Failed:", error);
        redirect('/login');
    }

    if (!user) {
        redirect('/login');
    }
    
    const userId = user.id;
    const email = user.emailAddresses[0]?.emailAddress || '';

    const name = user.firstName || 'Developer';
    
    try {
        // Sync to Neon Database
        await sql`
            INSERT INTO users (id, email, plan, compute_credits, created_at, updated_at)
            VALUES (${userId}, ${email}, 'hobby', 1000, now(), now())
            ON CONFLICT (id) DO NOTHING;
        `;
    } catch (dbError) {
        console.error("Database Sync Failed:", dbError);
    }

    // 🚀 THE MAGIC HANDOFF: 
    const finalDestination = searchParams.origin || '/dashboard';
    
    // Check if the destination is trying to open the desktop app
    if (finalDestination.startsWith('vextor://')) {
        // Intercept it: Send them to the dashboard and pass the deep link in the URL
        const finalDeepLink = `${finalDestination}?userId=${userId}&name=${encodeURIComponent(name)}`;
        
        redirect(`/dashboard?app_link=${encodeURIComponent(finalDeepLink)}`);


    } else {
        // Otherwise, send them to their normal web destination (like /pricing or /dashboard)
        redirect(finalDestination); 
    }
}