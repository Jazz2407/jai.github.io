import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { TrendingDown, Cpu, Code } from 'lucide-react';

export function AboutSection() {
  const { data } = usePortfolio();

  const statCards = [
    {
      icon: TrendingDown,
      value: data.stats.emailReduction,
      label: 'Email Processing Reduction',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Cpu,
      value: data.stats.aiSystems,
      label: 'AI-Powered Systems Built',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Code,
      value: data.stats.yearsExperience,
      label: 'Years of Experience',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="about" className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />
              <div className="relative z-10">
                <h3 className="text-2xl mb-4 text-white">Professional Summary</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Passionate software developer with expertise in building scalable, user-centric applications across
                  frontend, backend, and mobile platforms. Specialized in AI/ML integration, creating intelligent
                  systems that solve real-world problems.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Committed to continuous learning, effective problem-solving, and delivering meaningful contributions
                  to modern development teams. Experience ranges from implementing OpenAI-powered chatbots to
                  developing complete machine learning systems.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, translateX: 8 }}
                className="relative group"
              >
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl overflow-hidden">
                  {/* Gradient Glow on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  </div>

                  {/* Animated Border on Hover */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${stat.gradient} opacity-20 blur-xl`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
