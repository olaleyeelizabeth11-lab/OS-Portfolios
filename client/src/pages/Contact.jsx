import axios from 'axios';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/contact', form);
      setStatus('Message sent successfully.');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Unable to send message.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Contact</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Send a message through the portfolio system and connect with the developer behind this Windows 11 UI experience.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            Name
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
            />
          </label>
        </div>
        <label className="mt-4 block space-y-2 text-sm text-slate-200">
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            required
            className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400"
          />
        </label>
        <button type="submit" className="mt-6 rounded-3xl bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-blue-500">
          Send message
        </button>
        {status && <p className="mt-4 text-sm text-slate-300">{status}</p>}
      </form>
    </div>
  );
}
