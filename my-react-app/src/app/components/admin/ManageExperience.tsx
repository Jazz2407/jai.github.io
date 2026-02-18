import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { usePortfolio, Experience } from '../../context/PortfolioContext';
import { Plus, Edit2, Trash2, Briefcase, Calendar, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { ExperienceModal } from './ExperienceModal';
import { toast } from 'sonner';

export function ManageExperience() {
  const { data, deleteExperience } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(id);
      toast.success('Experience deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-white mb-1">Work Experience</h2>
          <p className="text-slate-400 text-sm">Manage your work history and achievements</p>
        </div>
        <Button
          onClick={() => {
            setEditingExperience(null);
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {/* Experience List */}
      {data.experiences.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 border-dashed"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl text-white mb-2">No experience added yet</h3>
            <p className="text-slate-400 mb-6">Start adding your professional journey</p>
            <Button
              onClick={() => {
                setEditingExperience(null);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {data.experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="group"
              >
                <div className="relative rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

                  <div className="relative z-10 p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl text-white mb-1">{exp.role}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div className="flex items-center gap-2 text-blue-400">
                                <Building className="w-4 h-4" />
                                <span>{exp.company}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>{exp.duration}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEdit(exp)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-blue-900/20 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(exp.id)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-2 mt-4">
                          {exp.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-2 flex-shrink-0" />
                              <p className="text-sm text-slate-300 leading-relaxed">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Experience Modal */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingExperience(null);
        }}
        experience={editingExperience}
      />
    </div>
  );
}
