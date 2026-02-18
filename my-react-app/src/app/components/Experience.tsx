import { Briefcase } from 'lucide-react';
import { Card } from './ui/card';

export function Experience() {
  const experiences = [
    {
      title: 'EXECUTIVE SOFTWARE DEVELOPER',
      company: 'Work Prioritized',
      period: '',
      description: [
        'Implemented a chatbot using OpenAI Intern',
        'Integrated OpenAI-powered chatbots into web applications to automate customer support, allowing users to get instant responses seamlessly.',
        'Developed a complete Brain Tumor Detection system, managing the entire process from collecting medical image data to displaying final product for accurate diagnosis.',
      ],
    },
    {
      title: 'Freelance | Developer | Video Editor',
      company: '',
      period: '',
      description: [
        'Built and deployed 5 full-featured web and mobile apps, handling everything from user interface design to backend database management.',
        'Collaborated with clients to create social media video content and used competitor analysis to optimize editing, exceeding expectations and boosting brand engagement.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl mb-12 text-center text-slate-900">Work Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-slate-100 p-3 rounded-lg">
                  <Briefcase className="w-6 h-6 text-slate-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-1 text-slate-900">{exp.title}</h3>
                  {exp.company && <p className="text-slate-600 mb-3">{exp.company}</p>}
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-slate-700 flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
