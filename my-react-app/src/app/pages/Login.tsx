import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // --- 1. SET YOUR CREDENTIALS HERE ---
  const ADMIN_EMAIL = "jaibharath2407@gmail.com";
  const ADMIN_PASSWORD = "admin123"; // Change this to your desired password!
  // ------------------------------------

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // --- 2. CHECK IF BOTH MATCH ---
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      
      // Success: Save to storage so the browser remembers you
      localStorage.setItem("user_email", email); 
      toast.success("Login Successful!");
      
      // Redirect to Admin Page
      window.location.href = "/admin"; 
      
    } else {
      // Failure: Show error
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 mb-4 border border-indigo-500/20">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-slate-400 mt-2 text-sm">Enter your credentials to manage portfolio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1.5 block uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pl-10 bg-slate-950/50 border-slate-700 text-white focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-slate-300 mb-1.5 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-slate-950/50 border-slate-700 text-white focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
            </div>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 mt-4 text-base shadow-lg shadow-indigo-500/20">
              Sign In to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <button 
              type="button"
              onClick={() => window.location.href = '/'}
              className="w-full text-sm text-slate-500 hover:text-slate-300 mt-4 transition-colors"
            >
              Back to Portfolio
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}