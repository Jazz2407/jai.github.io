import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Code, Database, Brain, Wrench, Users, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';


export function Skills() {
  const technicalSkills = {
    'Frontend Technologies': ['HTML & CSS', 'JavaScript', 'React JS'],
    'Backend Technologies': ['Node JS', 'Express JS'],
    'Database Technologies': ['MongoDB', 'Supabase', 'SQL'],
    'AI & Machine Learning': ['Machine Learning Techniques', 'Regression & Classification Models', 'LLMs'],
    'AI Tools & Frameworks': ['GPT-4', 'LangChain', 'OpenCV', 'YOLO v8'],
    'Development Tools': ['Flutter', 'Arduino', 'Raspberry Pi', 'Replit', 'Tableau', 'Figma', 'Canva'],
    'Analytics & Visualization': ['Power BI'],
    'Additional Knowledge': ['Flutter', 'API Integration', 'Basic Digital Marketing'],
  };

  const softSkills = [
    'Team Collaboration - Developed through freelance and academic group projects.',
    'Effective Communication - Strengthened by working closely with clients and project teams.',
    'Attention to Detail - Enhanced through video editing, ensuring flawless visual outputs.',
    'Continuous Learning & Adaptability - Demonstrated by consistently upskilling and learning new technologies.',
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl mb-12 text-center text-slate-900">Skills</h2>
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-slate-700" />
            <h3 className="text-2xl text-slate-900">Technical Skills</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(technicalSkills).map(([category, skills], index) => (
              <Card key={index} className="p-5">
                <h4 className="mb-3 text-slate-900">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="border-slate-300 text-slate-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-slate-700" />
            <h3 className="text-2xl text-slate-900">Soft Skills</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {softSkills.map((skill, index) => (
              <Card key={index} className="p-5 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{skill}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
