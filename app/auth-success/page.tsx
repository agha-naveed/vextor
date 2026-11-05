import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { ensureUserRecord } from '@/lib/ensureUser';
import { isAppDeepLink, isSafeInternalPath } from '@/lib/redirects';

// Landing page after every successful login/signup.
//  - makes sure the user has a row in Neon
//  - desktop app logins (origin=vextor://...) go to /dashboard?app_link=..., which hands control back to the IDE
//  - everything else goes back to where they came from, or /dashboard
export default async function AuthSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ origin?: string | string[] }>;
}) {
    // Next 16: searchParams is a Promise (reading it synchronously returns undefined)
    const params = await searchParams;
    const origin = Array.isArray(params.origin) ? params.origin[0] : params.origin;

    let user;
    try {
        user = await currentUser();
    } catch (error) {
        console.error('Auth Success: could not load Clerk user', error);
        redirect('/login');
    }

    if (!user) {
        redirect('/login');
    }

    // Create the Neon row if the Clerk webhook has not done it yet (name/email/credits all handled there)
    try {
        await ensureUserRecord(sql as any);
    } catch (dbError) {
        console.error('Auth Success: DB sync failed', dbError);
    }

    if (isAppDeepLink(origin)) {
        const separator = origin.includes('?') ? '&' : '?';
        const deepLink = `${origin}${separator}userId=${encodeURIComponent(user.id)}&name=${encodeURIComponent(user.firstName || 'Developer')}`;
        redirect(`/dashboard?app_link=${encodeURIComponent(deepLink)}`);
    }

    redirect(isSafeInternalPath(origin) ? origin : '/dashboard');
}
