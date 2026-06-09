'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId) {
      // This tells the browser to open the Vextor desktop app
      window.location.href = `vextor://auth?userId=${userId}`;
      
      // Optional: Close the browser tab automatically after a few seconds
      setTimeout(() => window.close(), 3000);
    }
  }, [userId]);

  return (
    <ClerkProvider>
         <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
    </ClerkProvider>
  );
}