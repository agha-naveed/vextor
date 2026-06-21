'use client';
import { useEffect } from 'react';

export default function RedirectHandler({ userId, firstName }: { userId: string | null, firstName: string }) {
  
  useEffect(() => {
    if (userId) {
      const safeName = encodeURIComponent(firstName);
      
      // 1. Force the auto-redirect immediately
      window.location.href = `vextor://auth?userId=${userId}&name=${safeName}`;
      
      // 2. Wait 3 seconds to ensure Electron catches the data before closing!
      setTimeout(() => {
        window.close();
      }, 3000);
    }
  }, [userId, firstName]);

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'inline-block', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
        <h2 style={{ color: '#166534', margin: '0 0 10px 0' }}>Authentication Successful!</h2>
        <p style={{ color: '#15803d', margin: 0, fontWeight: 'bold' }}>
          Returning you to Vextor IDE automatically...
        </p>
      </div>
      <p style={{ marginTop: '30px', color: '#888', fontSize: '14px' }}>
        You can safely close this browser tab.
      </p>
    </div>
  );
}