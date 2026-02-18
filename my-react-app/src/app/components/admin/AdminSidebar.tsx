import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Code2, 
  Briefcase, 
  Award, 
  Settings, 
  LogOut, // Import LogOut icon
  ArrowLeft 
} from 'lucide-react';
import { Button } from '../ui/button'; // Ensure you have your UI Button imported

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Manage Projects', icon: FolderOpen },
    { id: 'skills', label: 'Manage Skills', icon: Code2 },
    { id: 'experience', label: 'Manage Experience', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // --- LOGOUT FUNCTION ---
  const handleLogout = () => {
    // 1. Remove the email from storage
    localStorage.removeItem("user_email");
    
    // 2. Force a full page reload to the Home page
    // This ensures NavBar re-checks the storage and shows the "Login" button again
    window.location.href = "/"; 
  };
  // -----------------------

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#0F172A] border-r border-slate-800 flex flex-col z-50">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-slate-400">Portfolio Manager</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentPage === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          View Portfolio
        </Button>
        
        {/* LOGOUT BUTTON */}
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}