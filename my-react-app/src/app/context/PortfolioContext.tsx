import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "../supabaseClient";

// --- Exported Interfaces ---
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

// Added Stats interface to match your components' needs
interface PortfolioStats {
  emailReduction: string;
  aiSystems: string;
  yearsExperience: string;
}

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certifications: Certification[];
  stats: PortfolioStats; // Added stats here
}

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  // Project Actions
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  // Skill Actions
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  // Experience Actions
  addExperience: (exp: Omit<Experience, 'id'>) => Promise<void>;
  updateExperience: (id: string, exp: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  // Certification Actions
  addCertification: (cert: Omit<Certification, 'id'>) => Promise<void>;
  updateCertification: (id: string, cert: Partial<Certification>) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>({
    projects: [],
    skills: [],
    experiences: [],
    certifications: [],
    // Initializing stats with your specified default values
    stats: { 
      emailReduction: '40%', 
      aiSystems: '5+', 
      yearsExperience: '3+' 
    }
  });
  const [loading, setLoading] = useState(true);

  // --- Mappers ---
  const mapProjects = (db: any[]): Project[] => db.map(p => ({
    id: p.id, title: p.title, description: p.description,
    techStack: p.tech_stack || [], githubUrl: p.github_url || '',
    liveUrl: p.live_url || '', imageUrl: p.image_url || '',
    featured: p.featured || false, published: p.published || false,
  }));

  const mapSkills = (db: any[]): Skill[] => db.map(s => ({
    id: s.id, name: s.name, category: s.category, level: s.level || 0
  }));

  // --- Fetch Logic ---
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [p, s, e, c] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*').order('name'),
        supabase.from('experiences').select('*').order('created_at', { ascending: false }),
        supabase.from('certifications').select('*').order('date', { ascending: false })
      ]);

      setData(prev => ({
        ...prev, // Keeps the stats we initialized in state
        projects: mapProjects(p.data || []),
        skills: mapSkills(s.data || []),
        experiences: e.data || [],
        certifications: c.data || []
      }));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  // --- CRUD Implementations ---

  // PROJECTS
  const addProject = async (project: Omit<Project, 'id'>) => {
    const { data: newP, error } = await supabase.from('projects').insert([{
      title: project.title, description: project.description, tech_stack: project.techStack,
      image_url: project.imageUrl, github_url: project.githubUrl, live_url: project.liveUrl,
      featured: project.featured, published: project.published
    }]).select().single();
    if (error) throw error;
    setData(prev => ({ ...prev, projects: [mapProjects([newP])[0], ...prev.projects] }));
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { error } = await supabase.from('projects').update({
      title: updates.title, 
      tech_stack: updates.techStack,
      description: updates.description,
      image_url: updates.imageUrl,
      github_url: updates.githubUrl,
      live_url: updates.liveUrl,
      featured: updates.featured,
      published: updates.published
    }).eq('id', id);
    if (error) throw error;
    fetchAllData(); 
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  // SKILLS
  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    const { data: newS, error } = await supabase.from('skills').insert([skill]).select().single();
    if (error) throw error;
    setData(prev => ({ ...prev, skills: [...prev.skills, mapSkills([newS])[0]] }));
  };

  const updateSkill = async (id: string, updates: Partial<Skill>) => {
    const { error } = await supabase.from('skills').update(updates).eq('id', id);
    if (error) throw error;
    fetchAllData();
  };

  const deleteSkill = async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  };

  // EXPERIENCE
  const addExperience = async (exp: Omit<Experience, 'id'>) => {
    const { data: newE, error } = await supabase.from('experiences').insert([exp]).select().single();
    if (error) throw error;
    setData(prev => ({ ...prev, experiences: [newE, ...prev.experiences] }));
  };

  const updateExperience = async (id: string, updates: Partial<Experience>) => {
    const { error } = await supabase.from('experiences').update(updates).eq('id', id);
    if (error) throw error;
    fetchAllData();
  };

  const deleteExperience = async (id: string) => {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) throw error;
    setData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));
  };

  // CERTIFICATIONS
  const addCertification = async (cert: Omit<Certification, 'id'>) => {
    const { data: newC, error } = await supabase.from('certifications').insert([cert]).select().single();
    if (error) throw error;
    setData(prev => ({ ...prev, certifications: [newC, ...prev.certifications] }));
  };

  const updateCertification = async (id: string, updates: Partial<Certification>) => {
    const { error } = await supabase.from('certifications').update(updates).eq('id', id);
    if (error) throw error;
    fetchAllData();
  };

  const deleteCertification = async (id: string) => {
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    if (error) throw error;
    setData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  };

  return (
    <PortfolioContext.Provider value={{ 
      data, loading, 
      addProject, updateProject, deleteProject,
      addSkill, updateSkill, deleteSkill,
      addExperience, updateExperience, deleteExperience,
      addCertification, updateCertification, deleteCertification
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};