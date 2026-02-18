import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { Code, Database, Brain, Wrench, Server } from 'lucide-react';

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  'AI/ML': Brain,
  Database: Database,
  Tools: Wrench,
};

const categoryGradients = {
  Frontend: 'from-blue-500 to-cyan-500',
  Backend: 'from-green-500 to-emerald-500',
  'AI/ML': 'from-purple-500 to-pink-500',
  Database: 'from-orange-500 to-red-500',
  Tools: 'from-yellow-500 to-orange-500',
};

export function SkillsSection() {
  const { data } = usePortfolio();
  
  const categories = ['Frontend', 'Backend', 'AI/ML', 'Database', 'Tools'] as const;
  
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = data.skills.filter((s) => s.category === category);
    return acc;
  }, {} as Record<string, typeof data.skills>);

  return (
    <section id="skills" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built through continuous learning and real-world application
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category];
            const gradient = categoryGradients[category];
            const skills = skillsByCategory[category] || [];

            if (skills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="relative h-full rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl overflow-hidden p-6">
                  {/* Gradient Glow on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Header */}
                  <div className="relative z-10 flex items-center gap-3 mb-6">
                    <div className={`p-2.5 rounded-lg bg-gradient-to-r ${gradient}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl text-white">{category}</h3>
                  </div>

                  {/* Skills */}
                  <div className="relative z-10 space-y-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (index * 0.05), duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-300">{skill.name}</span>
                          <span className="text-xs text-slate-500">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) + 0.2, duration: 0.8, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r ${gradient} rounded-full relative`}
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/20" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-20 blur-xl`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
