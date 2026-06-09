'use client';
import { useEffect } from 'react';

export default function RedirectHandler({ userId }: { userId: string | null }) {
  useEffect(() => {
    if (userId) {
      // 1. Trigger the Deep Link to wake up the Vextor Electron app
      window.location.href = `vextor://auth?userId=${userId}`;
      
      // 2. Attempt to cleanly close the browser tab after a 3-second delay
      setTimeout(() => window.close(), 3000);
    }
  }, [userId]);

  return null; // This component doesn't need to render any UI
}