import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { usePortfolio, Skill } from '../../context/PortfolioContext';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { toast } from 'sonner';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill | null;
}

export function SkillModal({ isOpen, onClose, skill }: SkillModalProps) {
  const { addSkill, updateSkill } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend' as Skill['category'],
    level: 50,
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level,
      });
    } else {
      setFormData({
        name: '',
        category: 'Frontend',
        level: 50,
      });
    }
  }, [skill, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error('Please enter a skill name');
      return;
    }

    if (skill) {
      updateSkill(skill.id, formData);
      toast.success('Skill updated successfully');
    } else {
      addSkill(formData);
      toast.success('Skill added successfully');
    }

    onClose();
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
              className="relative w-full max-w-lg rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl"
            >
              {/* Header */}
              <div className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700 px-8 py-6 flex items-center justify-between rounded-t-2xl">
                <div>
                  <h2 className="text-2xl text-white">
                    {skill ? 'Edit Skill' : 'Add New Skill'}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    {skill ? 'Update skill details' : 'Add a new technical skill'}
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
                {/* Skill Name */}
                <div>
                  <Label htmlFor="skillName" className="text-slate-300 mb-2 block">
                    Skill Name *
                  </Label>
                  <Input
                    id="skillName"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    placeholder="e.g., React, Python, Docker"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-slate-300 mb-2 block">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                   onValueChange={(value: string) =>
                   setFormData({ ...formData, category: value as Skill['category'] })
}
                  >
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skill Level */}
                <div>
                  <Label className="text-slate-300 mb-3 block">
                    Skill Level: <span className="text-blue-400">{formData.level}%</span>
                  </Label>
                  <div className="space-y-4">
                    <Slider
                      value={[formData.level]}
                      onValueChange={(values: number[]) => setFormData({ ...formData, level: values[0] })
}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-700/50">
                  <p className="text-xs text-slate-500 mb-2">Preview</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{formData.name || 'Skill name'}</span>
                    <span className="text-xs text-slate-500">{formData.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${formData.level}%` }}
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
                    {skill ? 'Update Skill' : 'Add Skill'}
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
