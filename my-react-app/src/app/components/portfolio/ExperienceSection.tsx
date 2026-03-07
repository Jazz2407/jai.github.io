import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase } from 'lucide-react';

export function ExperienceSection() {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="py-32 px-4 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Professional journey building innovative solutions and driving technical excellence
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

          <div className="space-y-12">
            {data.experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 z-10 ring-4 ring-slate-900" />

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-3rem)] ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl overflow-hidden p-6">
                      {/* Gradient Glow on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

                      {/* Icon */}
                      <div className="relative z-10 flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl text-white mb-1">{exp.role}</h3>
                          <p className="text-blue-400">{exp.company}</p>
                          <p className="text-sm text-slate-500 mt-1">{exp.period}</p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="relative z-10 space-y-3">
                        {exp.highlights.map((highlight: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-2 flex-shrink-0" />
                            <p className="text-sm text-slate-300 leading-relaxed">{highlight}</p>
                          </div>
                        ))}
                      </div>

                      {/* Animated Border Glow */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
