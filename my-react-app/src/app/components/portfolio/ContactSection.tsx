
import { Mail, Linkedin, Github, Send, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { motion } from 'framer-motion';
// src/app/components/portfolio/ContactSection.tsx
import { useState, useRef, useEffect } from 'react'; // MUST include all three
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
// ... other imports
// ... other imports like lucide-react or emailjs




export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null); // Define the form reference
  const [isSending, setIsSending] = useState(false); // Define the loading state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' }); // Define form data

  // Initialize EmailJS to prevent the 400 error
  
  useEffect(() => {
    emailjs.init("WHdwiDdQaBsKWbzIO"); // Replace with your real Public Key
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    emailjs.sendForm(
      'service_uerhkbd',  // Replace with real Service ID
      'template_1yuqf3y', // Replace with real Template ID
      formRef.current
    )
    .then(() => {
      toast.success('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Email Error:', error);
      toast.error('Failed to send message.');
    })
    .finally(() => setIsSending(false));
  };

  // ... rest of your code (socialLinks array and return statement)

  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:jaibharath2407@gmail.com',
      value: 'jaibharath2407@gmail.com',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jaibharathkailash',
      value: 'https://www.linkedin.com/in/jaibharathkailash',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Jazz2407',
      value: 'https://github.com/Jazz2407',
      gradient: 'from-slate-500 to-slate-600',
    },
    {
      icon: Phone,
      label: 'Phone',
      href: 'tel:+918248228317',
      value: '+91 8248228317',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="contact" className="py-32 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-2xl text-white mb-4">Let's work together</h3>
                  <p className="text-slate-400 leading-relaxed">
                    I'm always interested in hearing about new projects and opportunities.
                    Whether you have a question or just want to say hi, feel free to reach out!
                  </p>
                </div>

                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${link.gradient}`}>
                        <link.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">{link.label}</p>
                        <p className="text-slate-300 group-hover:text-white transition-colors">
                          {link.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl" />
                
                <div className="relative z-10 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-slate-300 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name" // Added for EmailJS template
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-slate-300 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email" // Added for EmailJS template
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-slate-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message" // Added for EmailJS template
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 min-h-[150px] resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSending} // Disable while sending
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group disabled:opacity-50"
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                    {!isSending && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}