import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactWindow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="p-8 space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Get In Touch</h2>
        <p className="text-slate-400">Have a project idea or want to collaborate? Send me a message!</p>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
        >
          <p className="text-green-300 text-sm font-medium">✓ Message sent successfully! I'll get back to you soon.</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project inquiry"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
        >
          Send Message
        </button>
      </form>

      <div className="border-t border-white/10 pt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-slate-400 mb-1">Email</p>
          <a href="mailto:your.email@example.com" className="text-sm text-blue-400 hover:underline">
            your.email@example.com
          </a>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Phone</p>
          <a href="tel:+1234567890" className="text-sm text-blue-400 hover:underline">
            +1 (234) 567-8900
          </a>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Location</p>
          <p className="text-sm text-slate-300">Your City, State</p>
        </div>
      </div>
    </div>
  );
}
