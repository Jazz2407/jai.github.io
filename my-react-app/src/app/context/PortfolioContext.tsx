import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Database' | 'Tools';
  level: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certifications: Certification[];
  stats: {
    emailReduction: string;
    aiSystems: string;
    yearsExperience: string;
  };
}

interface PortfolioContextType {
  data: PortfolioData;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addCertification: (cert: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const initialData: PortfolioData = {
  projects: [
    {
      id: '1',
      title: 'Smart Inbox Assistant',
      description: 'Automated email agent using GPT-4 and LangChain to classify and draft responses with a secure approval system.',
      techStack: ['GPT-4', 'LangChain', 'Python', 'FastAPI'],
      githubUrl: 'https://github.com/Jazz2407',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
      featured: true,
      published: true,
    },
    {
      id: '2',
      title: 'AgroN AI',
      description: 'Autonomous rover using YOLO v8, Raspberry Pi, and Arduino for object detection with 95% accuracy in crop monitoring.',
      techStack: ['YOLO v8', 'Raspberry Pi', 'Arduino', 'IoT', 'Computer Vision'],
      githubUrl: 'https://github.com/Jazz2407',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
      featured: true,
      published: true,
    },
    {
      id: '3',
      title: 'Key Market Initiatives',
      description: 'Real-time market tracking platform app using Flutter and Supabase with optimized filtering algorithms.',
      techStack: ['Flutter', 'Supabase', 'Dart'],
      githubUrl: 'https://github.com/Jazz2407',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
      featured: false,
      published: true,
    },
    {
      id: '4',
      title: 'Stock Forecasting Analysis',
      description: 'Automated forecasting tool using statistical models with scikit-learn and Power BI for real-time market visualization.',
      techStack: ['Python', 'Scikit-learn', 'Power BI', 'Pandas'],
      githubUrl: 'https://github.com/Jazz2407',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop',
      featured: false,
      published: true,
    },
    {
      id: '5',
      title: 'Study Focus Tracker',
      description: 'Behavioral analysis system using OpenCV for tracking user attention with sub-100ms latency.',
      techStack: ['OpenCV', 'Computer Vision', 'Python', 'TensorFlow'],
      githubUrl: 'https://github.com/Jazz2407',
      liveUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop',
      featured: false,
      published: true,
    },
  ],
  skills: [
    { id: '1', name: 'React', category: 'Frontend', level: 90 },
    { id: '2', name: 'TypeScript', category: 'Frontend', level: 85 },
    { id: '3', name: 'Tailwind CSS', category: 'Frontend', level: 95 },
    { id: '4', name: 'Node.js', category: 'Backend', level: 88 },
    { id: '5', name: 'Express', category: 'Backend', level: 85 },
    { id: '6', name: 'Python', category: 'Backend', level: 92 },
    { id: '7', name: 'GPT-4', category: 'AI/ML', level: 90 },
    { id: '8', name: 'LangChain', category: 'AI/ML', level: 85 },
    { id: '9', name: 'OpenCV', category: 'AI/ML', level: 80 },
    { id: '10', name: 'YOLO v8', category: 'AI/ML', level: 82 },
    { id: '11', name: 'MongoDB', category: 'Database', level: 85 },
    { id: '12', name: 'Supabase', category: 'Database', level: 88 },
    { id: '13', name: 'PostgreSQL', category: 'Database', level: 80 },
    { id: '14', name: 'Git', category: 'Tools', level: 90 },
    { id: '15', name: 'Docker', category: 'Tools', level: 75 },
    { id: '16', name: 'Figma', category: 'Tools', level: 85 },
  ],
  experiences: [
    {
      id: '1',
      role: 'Executive Software Developer',
      company: 'Work Prioritized',
      duration: '2024 - Present',
      highlights: [
        'Implemented OpenAI-powered chatbots, automating customer support and enabling instant user responses',
        'Developed a complete Brain Tumor Detection system from data collection to final product deployment',
        'Reduced email processing time by 40% through intelligent automation',
      ],
    },
    {
      id: '2',
      role: 'Freelance Developer & Video Editor',
      company: 'Self-Employed',
      duration: '2022 - 2024',
      highlights: [
        'Built and deployed 5+ full-featured web and mobile applications',
        'Managed end-to-end development from UI design to database architecture',
        'Collaborated with clients to create optimized social media content, boosting brand engagement',
      ],
    },
  ],
  certifications: [
    {
      id: '1',
      title: 'Business Intelligence Using PowerBI',
      issuer: 'Skill Nation',
      year: '2023',
    },
    {
      id: '2',
      title: 'The Joy Of Computing Using Python',
      issuer: 'NPTEL',
      year: '2024',
    },
    {
      id: '3',
      title: 'Introduction To Industrial AI And IoT',
      issuer: 'NPTEL',
      year: '2024',
    },
  ],
  stats: {
    emailReduction: '40%',
    aiSystems: '5+',
    yearsExperience: '3+',
  },
};

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setData((prev) => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    setData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const deleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExp = { ...experience, id: Date.now().toString() };
    setData((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const addCertification = (cert: Omit<Certification, 'id'>) => {
    const newCert = { ...cert, id: Date.now().toString() };
    setData((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
  };

  const deleteCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addCertification,
        updateCertification,
        deleteCertification,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}
