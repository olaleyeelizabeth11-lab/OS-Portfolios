import { motion } from 'framer-motion';

export default function ProjectsWindow() {
  const projects = [
    {
      name: 'Project Alpha',
      description: 'A full-stack web application with React frontend and Node.js backend.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      link: '#'
    },
    {
      name: 'Project Beta',
      description: 'Real-time dashboard with WebSocket integration and data visualization.',
      tech: ['React', 'Express', 'Socket.io', 'Chart.js'],
      link: '#'
    },
    {
      name: 'Project Gamma',
      description: 'E-commerce platform with payment processing and inventory management.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: '#'
    },
    {
      name: 'Project Delta',
      description: 'Mobile-first PWA with offline capabilities and push notifications.',
      tech: ['React', 'Service Workers', 'IndexedDB', 'PWA'],
      link: '#'
    },
  ];

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
      
      <div className="grid gap-4">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <a href={project.link} className="text-xs px-3 py-1 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                View
              </a>
            </div>
            <p className="text-sm text-slate-400 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded bg-slate-800/50 text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
