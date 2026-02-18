import { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Portfolio } from './pages/Portfolio';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login'; // Ensure this import is present
import { Toaster } from './components/ui/sonner';

export default function App() {
  // 1. Update state type to include 'login'
  const [currentRoute, setCurrentRoute] = useState<'portfolio' | 'admin' | 'login'>('portfolio');

  useEffect(() => {
    // Simple client-side routing logic
    const handleRoute = () => {
      const path = window.location.pathname;
      
      // 2. Add logic to detect the /login path
      if (path.startsWith('/admin')) {
        setCurrentRoute('admin');
      } else if (path === '/login') {
        setCurrentRoute('login');
      } else {
        setCurrentRoute('portfolio');
      }
    };

    // Run on initial load
    handleRoute();

    // Listen for back/forward button clicks
    window.addEventListener('popstate', handleRoute);

    // Intercept manual navigation (like from your NavBar buttons)
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
        
        {/* 3. The Critical Fix: Render the correct component based on state */}
        {currentRoute === 'admin' ? (
          <Admin />
        ) : currentRoute === 'login' ? (
          <Login />
        ) : (
          <Portfolio />
        )}
        
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