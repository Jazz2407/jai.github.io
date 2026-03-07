import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { usePortfolio, Experience } from '../../context/PortfolioContext';
import { X, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: Experience | null;
}

export function ExperienceModal({ isOpen, onClose, experience }: ExperienceModalProps) {
  const { addExperience, updateExperience } = usePortfolio();
  
  // 1. Standardize state names to match the PortfolioContext interface
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '', // Changed from 'duration' to 'period'
    highlights: [] as string[],
  });
  const [highlightInput, setHighlightInput] = useState('');

  useEffect(() => {
    if (experience) {
      setFormData({
        role: experience.role,
        company: experience.company,
        period: experience.period, // Correctly mapping period to period
        highlights: experience.highlights,
      });
    } else {
      setFormData({
        role: '',
        company: '',
        period: '',
        highlights: [],
      });
    }
  }, [experience, isOpen]);

  // 2. Fixed handleSubmit with correct scope references
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Map the internal formData to the submission object
    const submissionData = {
      role: formData.role,
      company: formData.company,
      period: formData.period, 
      highlights: formData.highlights
    };

    try {
      if (experience) {
        // Now 'await' is correctly inside an 'async' function
        await updateExperience(experience.id, submissionData);
        toast.success('Experience updated successfully');
      } else {
        await addExperience(submissionData);
        toast.success('Experience added successfully');
      }
      onClose();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  // ... rest of your helper functions (addHighlight, removeHighlight)
  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, highlightInput.trim()],
      });
      setHighlightInput('');
    }
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
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
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl text-white">
                    {experience ? 'Edit Experience' : 'Add Experience'}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    {experience ? 'Update work experience details' : 'Add your professional experience'}
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
                {/* Role */}
                <div>
                  <Label htmlFor="role" className="text-slate-300 mb-2 block">
                    Job Role / Position *
                  </Label>
                  <Input
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    placeholder="e.g., Senior Software Developer"
                  />
                </div>

                {/* Company & Duration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className="text-slate-300 mb-2 block">
                      Company *
                    </Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      placeholder="e.g., Tech Company Inc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="text-slate-300 mb-2 block">
                      Duration *
                    </Label>
                    <Input
                      id="duration"
                      required
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      placeholder="e.g., 2022 - Present"
                    />
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <Label className="text-slate-300 mb-2 block">
                    Key Highlights *
                  </Label>
                  <div className="space-y-3">
                    {/* Add Highlight Input */}
                    <div className="flex gap-2">
                      <Textarea
                        value={highlightInput}
                        onChange={(e) => setHighlightInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            addHighlight();
                          }
                        }}
                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[80px] resize-none"
                        placeholder="Describe your achievement or responsibility..."
                      />
                      <Button
                        type="button"
                        onClick={addHighlight}
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 flex-shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Highlights List */}
                    {formData.highlights.length > 0 && (
                      <div className="space-y-2">
                        {formData.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 group hover:border-slate-600 transition-colors"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                            <p className="flex-1 text-sm text-slate-300 leading-relaxed">
                              {highlight}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeHighlight(index)}
                              className="p-1 rounded hover:bg-red-900/20 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-slate-500">
                      {formData.highlights.length} highlight{formData.highlights.length !== 1 ? 's' : ''} added
                    </p>
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
                    {experience ? 'Update Experience' : 'Add Experience'}
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
