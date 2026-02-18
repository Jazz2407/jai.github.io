import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FolderKanban, Code, Briefcase, Award, TrendingUp, Eye } from 'lucide-react';

export function Dashboard() {
  const { data } = usePortfolio();

  const stats = [
    {
      label: 'Total Projects',
      value: data.projects.length,
      published: data.projects.filter((p) => p.published).length,
      icon: FolderKanban,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Total Skills',
      value: data.skills.length,
      published: data.skills.length,
      icon: Code,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Work Experience',
      value: data.experiences.length,
      published: data.experiences.length,
      icon: Briefcase,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Certifications',
      value: data.certifications.length,
      published: data.certifications.length,
      icon: Award,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const recentActivity = [
    { action: 'Project published', item: 'Smart Inbox Assistant', time: '2 hours ago' },
    { action: 'Skill updated', item: 'React level increased to 90%', time: '5 hours ago' },
    { action: 'New certification added', item: 'NPTEL AI & IoT', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        <div className="relative z-10">
          <h2 className="text-3xl text-white mb-2">Welcome back, Jai Bharath! 👋</h2>
          <p className="text-blue-100">Here's what's happening with your portfolio today.</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="relative rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl p-6 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>

                  <div className="mb-2">
                    <div className="text-3xl text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Eye className="w-3 h-3" />
                    <span>{stat.published} published</span>
                  </div>
                </div>

                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${stat.gradient} opacity-20 blur-xl`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl p-6"
        >
          <h3 className="text-xl text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-800 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-slate-300">{activity.action}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.item}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl p-6"
        >
          <h3 className="text-xl text-white mb-6">Portfolio Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Featured Projects</span>
                <span className="text-sm text-white">{data.projects.filter((p) => p.featured).length}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${(data.projects.filter((p) => p.featured).length / data.projects.length) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Skills Mastered</span>
                <span className="text-sm text-white">
                  {data.skills.filter((s) => s.level >= 85).length}/{data.skills.length}
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${(data.skills.filter((s) => s.level >= 85).length / data.skills.length) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Published Content</span>
                <span className="text-sm text-white">
                  {data.projects.filter((p) => p.published).length}/{data.projects.length}
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  style={{
                    width: `${(data.projects.filter((p) => p.published).length / data.projects.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
