import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { usePortfolio, Project } from '../../context/PortfolioContext';
import { Plus, Edit2, Trash2, Star, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { ProjectModal } from './ProjectModal';
import { toast } from 'sonner';

export function ManageProjects() {
  const { data, updateProject, deleteProject } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      toast.success('Project deleted successfully');
    }
  };

  const togglePublished = (project: Project) => {
    updateProject(project.id, { published: !project.published });
    toast.success(`Project ${project.published ? 'unpublished' : 'published'}`);
  };

  const toggleFeatured = (project: Project) => {
    updateProject(project.id, { featured: !project.featured });
    toast.success(`Project ${project.featured ? 'unfeatured' : 'featured'}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-white mb-1">Projects</h2>
          <p className="text-slate-400 text-sm">Manage your portfolio projects</p>
        </div>
        <Button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {data.projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 border-dashed"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl text-white mb-2">No projects yet</h3>
            <p className="text-slate-400 mb-6">Get started by adding your first project</p>
            <Button
              onClick={() => {
                setEditingProject(null);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {data.projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="relative rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl overflow-hidden">
                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    {project.featured && (
                      <div className="px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-yellow-300">Featured</span>
                      </div>
                    )}
                    {!project.published && (
                      <div className="px-2 py-1 rounded-full bg-slate-500/20 border border-slate-500/30 backdrop-blur-sm flex items-center gap-1">
                        <EyeOff className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-300">Draft</span>
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg text-white mb-1 line-clamp-1">{project.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-md bg-slate-800/50 text-slate-300 border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-slate-800/50 text-slate-400 border border-slate-700/50">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <div className="flex gap-2">
                        {/* Featured Toggle */}
                        <button
                          onClick={() => toggleFeatured(project)}
                          className={`p-2 rounded-lg transition-colors ${
                            project.featured
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-slate-800 text-slate-400 hover:text-yellow-400'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className={`w-4 h-4 ${project.featured ? 'fill-yellow-400' : ''}`} />
                        </button>

                        {/* Published Toggle */}
                        <button
                          onClick={() => togglePublished(project)}
                          className={`p-2 rounded-lg transition-colors ${
                            project.published
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-slate-800 text-slate-400 hover:text-green-400'
                          }`}
                          title="Toggle Published"
                        >
                          {project.published ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <div className="flex gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-blue-900/20 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        project={editingProject}
      />
    </div>
  );
}
