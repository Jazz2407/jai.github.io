import { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { Dashboard } from '../components/admin/Dashboard';
import { ManageProjects } from '../components/admin/ManageProjects';
import { ManageSkills } from '../components/admin/ManageSkills';
import { ManageExperience } from '../components/admin/ManageExperience';
import { ManageCertifications } from '../components/admin/ManageCertifications';

export function Admin() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const pageConfig = {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview of your portfolio analytics',
      component: Dashboard,
    },
    projects: {
      title: 'Manage Projects',
      subtitle: 'Add, edit, and organize your portfolio projects',
      component: ManageProjects,
    },
    skills: {
      title: 'Manage Skills',
      subtitle: 'Update your technical skills and expertise',
      component: ManageSkills,
    },
    experience: {
      title: 'Manage Experience',
      subtitle: 'Update your work history and achievements',
      component: ManageExperience,
    },
    certifications: {
      title: 'Certifications',
      subtitle: 'Manage your professional certifications',
      component: ManageCertifications,
    },
    settings: {
      title: 'Settings',
      subtitle: 'Configure your portfolio preferences',
      component: () => (
        <div className="text-center py-20">
          <h3 className="text-2xl text-white mb-2">Settings</h3>
          <p className="text-slate-400">Coming soon...</p>
        </div>
      ),
    },
  };

  const currentPageConfig = pageConfig[currentPage as keyof typeof pageConfig] || pageConfig.dashboard;
  const PageComponent = currentPageConfig.component;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-x-hidden">
      <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="ml-[280px] min-h-screen bg-[#0F172A] flex flex-col">
        <AdminHeader title={currentPageConfig.title} subtitle={currentPageConfig.subtitle} />
        
        <main className="p-8 flex-1 bg-[#0F172A]">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}