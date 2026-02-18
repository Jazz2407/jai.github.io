import { Code2, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function Projects() {
  const projects = [
    {
      title: 'Smart Inbox Assistant | LLM Application Developer',
      description: 'Developed an automated email agent using GPT-4 and LangChain to classify and draft responses. Implemented a secure "human-in-the-loop" approval system, reducing daily processing time by 40%.',
      tech: ['GPT-4', 'LangChain', 'Python'],
    },
    {
      title: 'AgroN AI | AI & IoT Engineer',
      description: 'Designed an autonomous rover using YOLO v8, Raspberry Pi, and Arduino for object detection. Integrated environmental sensors to achieve 95% accuracy in real-time crop monitoring, designed to automate manual feedback.',
      tech: ['YOLO v8', 'Raspberry Pi', 'Arduino', 'IoT'],
    },
    {
      title: 'Key Market Initiatives',
      description: 'Developed a real-time market tracking platform app using Flutter and Supabase. Optimized filtering algorithms to improve query response speed by 20%.',
      tech: ['Flutter', 'Supabase'],
    },
    {
      title: 'Stock Forecasting Analysis',
      description: 'Built an automated forecasting tool using statistical models, leveraging scikit-learn and Power BI to deliver real-time market visualization dashboards.',
      tech: ['Python', 'Scikit-learn', 'Power BI'],
    },
    {
      title: 'Study Focus Tracker',
      description: 'Developed a behavioral analysis system using OpenCV and Computer Vision. Optimized detection to track user attention with sub-100ms latency.',
      tech: ['OpenCV', 'Computer Vision', 'Python'],
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl mb-12 text-center text-slate-900">Projects</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Code2 className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-xl flex-1 text-slate-900">{project.title}</h3>
              </div>
              <p className="text-slate-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
