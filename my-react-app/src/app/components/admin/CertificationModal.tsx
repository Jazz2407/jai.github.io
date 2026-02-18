import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { usePortfolio, Certification } from '../../context/PortfolioContext';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification: Certification | null;
}

export function CertificationModal({ isOpen, onClose, certification }: CertificationModalProps) {
  const { addCertification, updateCertification } = usePortfolio();
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    year: '',
    url: '',
  });

  useEffect(() => {
    if (certification) {
      setFormData({
        title: certification.title,
        issuer: certification.issuer,
        year: certification.year,
        url: certification.url || '',
      });
    } else {
      setFormData({
        title: '',
        issuer: '',
        year: '',
        url: '',
      });
    }
  }, [certification, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.issuer || !formData.year) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (certification) {
      updateCertification(certification.id, formData);
      toast.success('Certification updated successfully');
    } else {
      addCertification(formData);
      toast.success('Certification added successfully');
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
                    {certification ? 'Edit Certification' : 'Add Certification'}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    {certification ? 'Update certification details' : 'Add a new professional certification'}
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
                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-slate-300 mb-2 block">
                    Certification Title *
                  </Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    placeholder="e.g., AWS Certified Solutions Architect"
                  />
                </div>

                {/* Issuer */}
                <div>
                  <Label htmlFor="issuer" className="text-slate-300 mb-2 block">
                    Issuing Organization *
                  </Label>
                  <Input
                    id="issuer"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>

                {/* Year & URL */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year" className="text-slate-300 mb-2 block">
                      Year *
                    </Label>
                    <Input
                      id="year"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      placeholder="e.g., 2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="url" className="text-slate-300 mb-2 block">
                      Certificate URL
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-700/50">
                  <p className="text-xs text-slate-500 mb-3">Preview</p>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
                      <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm mb-1">{formData.title || 'Certification Title'}</h4>
                      <p className="text-xs text-slate-400">{formData.issuer || 'Issuing Organization'}</p>
                      <p className="text-xs text-slate-500 mt-1">{formData.year || 'Year'}</p>
                    </div>
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
                    {certification ? 'Update Certification' : 'Add Certification'}
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
