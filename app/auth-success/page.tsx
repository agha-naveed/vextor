// 'use client';
// import { useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

// export default function AuthSuccessPage() {
//   const searchParams = useSearchParams();
//   const userId = searchParams.get('userId');

//   useEffect(() => {
//     if (userId) {
//       // This tells the browser to open the Vextor desktop app
//       window.location.href = `vextor://auth?userId=${userId}`;
      
//       // Optional: Close the browser tab automatically after a few seconds
//       setTimeout(() => window.close(), 3000);
//     }
//   }, [userId]);

//   return (
//     <ClerkProvider>
//          <header className="flex justify-end items-center p-4 gap-4 h-16">
//             <Show when="signed-out">
//               <SignInButton />
//               <SignUpButton>
//                 <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </Show>
//             <Show when="signed-in">
//               <UserButton />
//             </Show>
//           </header>
//     </ClerkProvider>
//   );
// }

import { auth } from '@clerk/nextjs/server';
import RedirectHandler from './RedirectHandler';

export default function AuthSuccessPage() {
  // auth() securely grabs the ID on the server and automatically opts this route out of static pre-rendering
  const { userId } : any = auth(); 

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h2>Login Successful!</h2>
      <p>Returning you to the Vextor IDE...</p>
      <p><small style={{ color: '#888' }}>If the app doesn't open, click "Open Vextor" in your browser prompt.</small></p>
      
      {/* Pass the ID down to the client component to handle the browser redirect */}
      <RedirectHandler userId={userId} />
    </div>
  );
}