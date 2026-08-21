// import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db'; 
import Link from 'next/link';
import IdeAlert from './IdeAlert';
import ManageBillingButton from './ManageBillingButton';

export default async function DashboardPage({ searchParams }: { searchParams: { app_link?: string } }) {
    // 1. Authenticate with Clerk
    // const user = await currentUser();
    
    // if (!user) {
    //     redirect('/login');
    // }
const user = {
    id: "user_3GuczoBOrWMlJ4zzEMp13zlowAr",
    firstName: "Naveed"
}
    // 2. Fetch the user's credits and plan from your Neon DB
    const dbResult = await sql`
        SELECT plan, 'compute_credits', subscription_id 
        FROM users 
        WHERE id = ${user.id} 
        LIMIT 1
    `;

    // Failsafe: If they somehow bypassed the sync, force them back
    if (dbResult.length === 0) {
        redirect('/auth-success');
    }

    const userData = dbResult[0];
    const plan = userData.plan || 'hobby';
    const credits = userData.compute_credits || 0;

    // 3. Calculate max limits for the progress bar
    let maxCredits = 1000;
    let planName = "Hobby (Free)";
    
    if (plan === 'pro') {
        maxCredits = 50000;
        planName = "Pro";
    } else if (plan === 'teams') {
        maxCredits = 500000;
        planName = "Teams";
    }

    const creditPercentage = Math.min(100, Math.max(0, (credits / maxCredits) * 100));
    const isOutOfCredits = credits <= 0;

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-[#06070a] p-6 sm:p-12 font-sans">
            <div className="max-w-4xl mx-auto">

                {searchParams.app_link && (
                    <IdeAlert appLink={searchParams.app_link} />
                )}
                
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                        Welcome back, {user.firstName || 'Developer'}
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                        Manage your Vextor AI IDE settings and compute limits.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Active Plan Card */}
                    <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#06070a]/80 p-8 backdrop-blur-2xl shadow-xl shadow-black/5 dark:shadow-none flex flex-col justify-between">
                        <div>
                            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">Current Plan</p>
                            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white capitalize tracking-tighter">
                                {planName}
                            </h2>
                        </div>
                        
                        <div className="mt-8">
                            {plan === 'hobby' ? (
                                <Link href="/pricing">
                                    <button className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-[0_0_20px_var(--color-primary)] hover:opacity-90 transition-all">
                                        Upgrade to Pro
                                    </button>
                                </Link>
                            ) : (
                                // 🚀 Drop the fully functional client component here!
                                <ManageBillingButton />
                            )}
                        </div>
                    </div>

                    {/* Compute Credits Card */}
                    <div className="rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-[#06070a]/80 p-8 backdrop-blur-2xl shadow-xl shadow-black/5 dark:shadow-none">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">Compute Credits</p>
                                <h3 className="text-4xl font-bold text-neutral-900 dark:text-white tracking-tighter">
                                    {credits.toLocaleString()}
                                </h3>
                            </div>
                            <span className="text-sm text-neutral-500 mb-1">/ {maxCredits.toLocaleString()}</span>
                        </div>

                        {/* Progress Bar UI */}
                        <div className="w-full bg-neutral-200 dark:bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
                            <div 
                                className={`h-3 rounded-full transition-all duration-1000 ease-out ${isOutOfCredits ? 'bg-red-500' : 'bg-primary'}`}
                                style={{ width: `${creditPercentage}%` }}
                            ></div>
                        </div>

                        {isOutOfCredits ? (
                            <p className="text-xs text-red-500 font-medium">
                                Credits exhausted. Upgrade or wait for the next billing cycle.
                            </p>
                        ) : (
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                Credits reset at the beginning of your billing cycle.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}