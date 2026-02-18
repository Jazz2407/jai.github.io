import { NavBar } from '../components/portfolio/NavBar';
import { HeroSection } from '../components/portfolio/HeroSection';
import { AboutSection } from '../components/portfolio/AboutSection';
import { ProjectsSection } from '../components/portfolio/ProjectsSection';
import { SkillsSection } from '../components/portfolio/SkillsSection';
import { ExperienceSection } from '../components/portfolio/ExperienceSection';
import { EducationSection } from '../components/portfolio/EducationSection';
import { ContactSection } from '../components/portfolio/ContactSection';
import { motion } from 'framer-motion';


export function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <NavBar />
      <main id="home">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl text-white mb-2">Let's Build Something Amazing</h3>
            <p className="text-slate-400">© 2026 Jai Bharath Kailash C. All rights reserved.</p>
          </div>
          <div className="flex justify-center gap-6 text-sm text-slate-500">
            <span>Built with React & Tailwind</span>
            <span>•</span>
            <span>Powered by AI & Innovation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
