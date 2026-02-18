import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Ref to track if we clicked a link
  const isManualScroll = useRef(false);
  
  // FIX: Use 'number' instead of 'NodeJS.Timeout' for browser compatibility
  const scrollTimeout = useRef<number | null>(null);

  const userEmail = localStorage.getItem("user_email");
  const ADMIN_EMAIL = "jaibharath2407@gmail.com"; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // 1. If we are NOT manually scrolling (clicking), update the active section based on position
      if (!isManualScroll.current) {
        const sections = ['home', 'about', 'projects', 'skills', 'experience', 'education', 'contact'];
        
        const current = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // A section is active if it covers the middle-top part of the screen
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });

        if (current) setActiveSection(current);
      }

      // 2. DETECT SCROLL END: Unlock the spy only when scrolling stops
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // FIX: Cast the return value to 'number' to satisfy TypeScript in browsers
      scrollTimeout.current = window.setTimeout(() => {
        isManualScroll.current = false;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const navLinks = [
    { href: 'home', label: 'Home' },
    { href: 'about', label: 'About' },
    { href: 'projects', label: 'Projects' },
    { href: 'skills', label: 'Skills' },
    { href: 'experience', label: 'Experience' },
    { href: 'education', label: 'Education' },
    { href: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    // 3. Lock the scroll spy immediately
    isManualScroll.current = true;
    
    // 4. Move the line immediately to the clicked section
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur group-hover:blur-md transition-all" />
                <div className="relative bg-slate-900 p-2 rounded-lg border border-slate-700">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <span className="text-xl text-white font-semibold">JBK</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-4 py-2 text-sm transition-colors ${
                    activeSection === link.href ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Admin & Login Buttons */}
            {userEmail === ADMIN_EMAIL ? (
              <div className="hidden md:flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white transition-all rounded-lg"
                  onClick={() => window.location.href = '/admin'}
                >
                  Admin
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white transition-colors"
                  onClick={() => window.location.href = '/login'}
                >
                  Login
                </Button>
              </div>
            )}

            {/* Mobile Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-300">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-slate-800"
            >
              <div className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-left px-4 py-3 rounded-lg ${
                      activeSection === link.href
                        ? 'bg-indigo-600/10 text-indigo-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}