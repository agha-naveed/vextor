import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
    // This component automatically catches the Google login data
    // and seamlessly forwards the user to your redirectUrlComplete (/auth-success)
    return (
        <div className="flex h-screen w-full items-center justify-center bg-neutral-50 dark:bg-[#06070a]">
            <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-neutral-500 text-sm">Completing secure login...</p>
            </div>
            
            {/* Clerk's invisible handler */}
            <AuthenticateWithRedirectCallback />
        </div>
    );
}