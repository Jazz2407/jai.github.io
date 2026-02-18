import { GraduationCap, Award } from 'lucide-react';
import { Card } from './ui/card';

export function Education() {
  const education = [
    {
      degree: 'B.Tech ARTIFICIAL INTELLIGENCE AND DATA SCIENCE',
      institution: 'Francis Xavier Engineering College (2022-2026)',
      gpa: 'GPA - 8.6',
    },
  ];

  const certifications = [
    {
      title: 'BUSINESS INTELLIGENCE USING POWERBI',
      issuer: 'by Skill Nation',
      year: '(2023)',
    },
    {
      title: 'NPTEL: The Joy Of Computing Using Python',
      issuer: '',
      year: '(2024)',
    },
    {
      title: 'NPTEL: Introduction To Industrial AI And IoT',
      issuer: 'Industrial Internet Of Things',
      year: '(2024)',
    },
  ];

  return (
    <section id="education" className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl mb-12 text-center text-slate-900">Education & Certifications</h2>
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-slate-700" />
            <h3 className="text-2xl text-slate-900">Education</h3>
          </div>
          {education.map((edu, index) => (
            <Card key={index} className="p-6">
              <h4 className="text-xl mb-2 text-slate-900">{edu.degree}</h4>
              <p className="text-slate-700 mb-1">{edu.institution}</p>
              <p className="text-slate-600">{edu.gpa}</p>
            </Card>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-slate-700" />
            <h3 className="text-2xl text-slate-900">Certifications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-5">
                <h4 className="mb-1 text-slate-900">{cert.title}</h4>
                <p className="text-slate-600">
                  {cert.issuer && `${cert.issuer} `}
                  <span className="text-slate-500">{cert.year}</span>
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
