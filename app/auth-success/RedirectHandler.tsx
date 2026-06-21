'use client';
import { useEffect } from 'react';

export default function RedirectHandler({ userId, firstName }: { userId: string | null, firstName: string }) {
  
const handleOpenApp = () => {
    if (userId) {
      // Safely encode the name so spaces don't break the URL
      const safeName = encodeURIComponent(firstName);
      window.location.assign(`vextor://auth?userId=${userId}&name=${safeName}`);
    }
  };
  

  // Keep the automatic attempt on page load
  useEffect(() => {
    if (userId) {
      handleOpenApp();
      // Optional: still try to close the tab automatically
      setTimeout(() => window.close(), 2000);
    }
  }, [userId]);

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh', fontFamily: 'sans-serif' }}>
      <h2>Login Successful!</h2>
      <p style={{ color: '#555', marginBottom: '30px' }}>
        You are securely authenticated.
      </p>

      {/* 🚀 The explicit manual button */}
      <button 
        onClick={handleOpenApp}
        style={{
          padding: '12px 24px',
          backgroundColor: '#3184FF',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#266edb'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3184FF'}
      >
        Open Vextor IDE
      </button>

      <p style={{ marginTop: '20px' }}>
        <small style={{ color: '#888' }}>
          If the app does not open automatically, click the button above.<br/>
          You can safely close this tab afterward.
        </small>
      </p>
    </div>
  );
}