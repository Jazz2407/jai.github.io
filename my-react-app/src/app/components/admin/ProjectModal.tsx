import { motion, AnimatePresence } from 'framer-motion'; // Changed from 'motion/react' to 'framer-motion' for standard compatibility
import { useState, useEffect } from 'react';
import { usePortfolio, Project } from '../../context/PortfolioContext';
import { X, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { toast } from 'sonner';
// Import the new FileUpload component
import { FileUpload } from '../admin/FileUpload'; 

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { addProject, updateProject } = usePortfolio();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [] as string[],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: false,
    published: true,
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        imageUrl: project.imageUrl,
        featured: project.featured,
        published: project.published,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        techStack: [],
        githubUrl: '',
        liveUrl: '',
        imageUrl: '',
        featured: false,
        published: true,
      });
    }
  }, [project, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (project) {
      updateProject(project.id, formData);
      toast.success('Project updated successfully');
    } else {
      addProject(formData);
      toast.success('Project added successfully');
    }

    onClose();
  };

  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl text-white">
                    {project ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    {project ? 'Update project details' : 'Fill in the project information'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Project Title */}
                <div>
                  <Label htmlFor="title" className="text-slate-300 mb-2 block">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    placeholder="e.g., Smart Inbox Assistant"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-slate-300 mb-2 block">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px] resize-none"
                    placeholder="Describe your project..."
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <Label className="text-slate-300 mb-2 block">Tech Stack</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      placeholder="Add technology (press Enter)"
                    />
                    <Button
                      type="button"
                      onClick={addTech}
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 text-sm flex items-center gap-2"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTech(tech)}
                          className="hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* URLs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="githubUrl" className="text-slate-300 mb-2 block">
                      GitHub URL
                    </Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="liveUrl" className="text-slate-300 mb-2 block">
                      Live Demo URL
                    </Label>
                    <Input
                      id="liveUrl"
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* REPLACED MANUAL IMAGE URL INPUT WITH DRAG & DROP COMPONENT */}
                <div>
                  <FileUpload 
                    value={formData.imageUrl} 
                    onChange={(url) => setFormData({ ...formData, imageUrl: url as string })} 
                  />
                </div>

                {/* Toggles */}
                <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg bg-slate-900/30 border border-slate-700/50">
                  <div className="flex items-center justify-between flex-1">
                    <div>
                      <Label className="text-slate-300">Featured Project</Label>
                      <p className="text-xs text-slate-500 mt-1">Show in featured section</p>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked: boolean | "indeterminate") => 
                        setFormData({ ...formData, featured: checked === true })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <div>
                      <Label className="text-slate-300">Publish</Label>
                      <p className="text-xs text-slate-500 mt-1">Make visible on portfolio</p>
                    </div>
                    <Switch
                      checked={formData.published}
                      onCheckedChange={(checked: boolean | "indeterminate") => 
                        setFormData({ ...formData, published: checked === true })
                      }
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-slate-700">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {project ? 'Update Project' : 'Save Project'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}