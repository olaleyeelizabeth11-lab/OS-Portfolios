import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const error = await response.json();
        setStatus('error');
        setErrorMessage(error.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage('Connection error. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-3xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Let's Build Something Great</h1>
        <p className="text-slate-400 text-lg">
          I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to reach out!
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { icon: '📧', label: 'Email', value: 'olaleyeelizabeth11@gmail.com', action: 'mailto:olaleyeelizabeth11@gmail.com' },
          { icon: '📱', label: 'Phone', value: '(234) 912-311-3799', action: 'tel:+9123113799' },
          { icon: '⏱️', label: 'Response Time', value: 'Within 24 hours', action: null },
        ].map((info, idx) => (
          <motion.a
            key={idx}
            href={info.action || '#'}
            whileHover={{ y: -4 }}
            className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-center cursor-pointer"
          >
            <div className="text-3xl mb-2">{info.icon}</div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{info.label}</p>
            <p className="text-sm text-slate-300 mt-1 font-medium">{info.value}</p>
          </motion.a>
        ))}
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 flex items-start gap-3"
          >
            <span className="text-2xl flex-shrink-0">✓</span>
            <div>
              <h3 className="font-semibold text-green-300">Message Sent Successfully!</h3>
              <p className="text-sm text-green-300/80 mt-1">
                Thanks for reaching out! I'll get back to you shortly.
              </p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex items-start gap-3"
          >
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-300">Error</h3>
              <p className="text-sm text-red-300/80 mt-1">{errorMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-xl border border-white/10 bg-white/5"
      >
        {/* Name Field */}
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label className="block text-sm font-semibold text-white">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label className="block text-sm font-semibold text-white">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
        </motion.div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          />
        </div>

        {/* Message Field */}
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label className="block text-sm font-semibold text-white">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project or inquiry..."
            rows="5"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === 'loading'}
          type="submit"
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-lg"
              >
                ⏳
              </motion.div>
              Sending...
            </>
          ) : (
            <>
              <span>📤 Send Message</span>
            </>
          )}
        </motion.button>

        {/* Additional Info */}
        <p className="text-xs text-slate-400 text-center">
          I typically respond within a few hours. Your message is important to me!
        </p>
      </motion.form>

      {/* Social Links & Availability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="p-4 rounded-lg border border-white/10 bg-white/5 text-center space-y-3">
          <p className="text-sm text-slate-400">Follow me on social media:</p>
          <div className="flex justify-center gap-10">
            {[
              { icon: '🐙', label: 'GitHub', url: 'https://github.com/olaleyeelizabeth11-lab' },
              { icon: '💼', label: 'LinkedIn', url: 'https://www.linkedin.com/in/elizabeth-olaleye-1b6102382/' },
              { icon: '𝕏', label: 'Twitter', url: 'https://x.com/lisa0295876184' },
              // { icon: '📝', label: 'Blog', url: 'https://blog.example.com' },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.2, y: -4 }}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:opacity-80 transition-opacity"
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-center">
          <p className="text-sm text-green-300 font-medium">✨ Currently Available for Contract & Full-Time Roles</p>
          <p className="text-xs text-green-300/70 mt-1">Looking for passionate teams working on impactful projects</p>
        </div>
      </motion.div>
    </div>
  );
}
