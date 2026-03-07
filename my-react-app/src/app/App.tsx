import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext'; 
import { Portfolio } from './pages/Portfolio'; 
import { Admin } from './pages/Admin';
import { Login } from './pages/Login'; 
import { Toaster } from './components/ui/sonner';

export default function App() {
  // State to handle basic routing without a heavy library
  const [currentRoute, setCurrentRoute] = useState<'portfolio' | 'admin' | 'login'>('portfolio');

  useEffect(() => {
    // Simple client-side routing logic
    const handleRoute = () => {
      const path = window.location.pathname;
      
      if (path.startsWith('/admin')) {
        setCurrentRoute('admin');
      } else if (path === '/login') {
        setCurrentRoute('login');
      } else {
        setCurrentRoute('portfolio');
      }
    };

    // Initialize route on load
    handleRoute();

    // Listen for browser navigation (Back/Forward)
    window.addEventListener('popstate', handleRoute);

    // Overwrite pushState to update UI when navigating manually
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleRoute();
    };

    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.history.pushState = originalPushState;
    };
  }, []);

  return (
    <PortfolioProvider>
      <div className="min-h-screen w-full bg-[#0F172A] text-white">
        
        {/* Conditional Rendering based on URL path */}
        {currentRoute === 'admin' ? (
          <Admin />
        ) : currentRoute === 'login' ? (
          <Login />
        ) : (
          <Portfolio />
        )}
        
        {/* Toaster for notifications (e.g., successful contact form or admin updates) */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgb(15 23 42)',
              color: 'white',
              border: '1px solid rgb(51 65 85)',
            },
          }}
        />
      </div>
    </PortfolioProvider>
  );
}