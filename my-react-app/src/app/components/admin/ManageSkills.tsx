import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { usePortfolio, Skill } from '../../context/PortfolioContext';
import { Plus, Edit2, Trash2, Code, Server, Brain, Database, Wrench } from 'lucide-react';
import { Button } from '../ui/button';
import { SkillModal } from './SkillModal';
import { toast } from 'sonner';

// Updated keys to match your desired display titles
const categoryIcons: Record<string, any> = {
  'AI & Machine Learning (Primary Focus)': Brain,
  'Backend & Database': Server,
  'Frontend & Mobile': Code,
  'Tools & Analytics': Wrench,
};

const categoryGradients: Record<string, string> = {
  'AI & Machine Learning (Primary Focus)': 'from-purple-500 to-pink-500',
  'Backend & Database': 'from-green-500 to-emerald-500',
  'Frontend & Mobile': 'from-blue-500 to-cyan-500',
  'Tools & Analytics': 'from-yellow-500 to-orange-500',
};

export function ManageSkills() {
  const { data, deleteSkill } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Redefined categories to match the requested format
  const categories = [
    'AI & Machine Learning (Primary Focus)',
    'Backend & Database',
    'Frontend & Mobile',
    'Tools & Analytics'
  ] as const;

  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = data.skills.filter((s) => s.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      deleteSkill(id);
      toast.success('Skill deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-white mb-1">Skills</h2>
          <p className="text-slate-400 text-sm">Manage your technical skills and expertise levels</p>
        </div>
        <Button
          onClick={() => {
            setEditingSkill(null);
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Skill
        </Button>
      </div>

      {/* Skills by Category */}
      {data.skills.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 border-dashed"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl text-white mb-2">No skills yet</h3>
            <p className="text-slate-400 mb-6">Start building your skill portfolio</p>
            <Button
              onClick={() => {
                setEditingSkill(null);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {categories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category] || Code;
            const gradient = categoryGradients[category] || 'from-slate-500 to-slate-600';
            const skills = skillsByCategory[category] || [];

            if (skills.length === 0) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-r ${gradient}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-white font-bold">{category}</h3>
                    <p className="text-sm text-slate-500">{skills.length} skills</p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ y: -2 }}
                        className="group"
                      >
                        <div className="relative rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl p-5">
                          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-xl`} />

                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-white font-medium mb-1">{skill.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500">Level</span>
                                  <span className="text-sm text-slate-300">{skill.level}%</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(skill)}
                                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-blue-900/20 transition-colors"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(skill.id)}
                                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                className={`h-full bg-gradient-to-r ${gradient} relative`}
                              >
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/20" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <SkillModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSkill(null);
        }}
        skill={editingSkill}
      />
    </div>
  );
}