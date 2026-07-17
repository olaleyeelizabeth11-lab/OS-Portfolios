import { motion } from 'framer-motion';

export default function AboutApp() {
  const skills = [
    { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'] },
    { category: 'Fullstack', items: ['MERN Stack', 'Next.js'] },
    { category: 'Deployment', items: ['Production Deployment', 'Live Products'] },
  ];

  const projectHighlights = [
    { emoji: '💼', title: 'Job Recruitment Portal', desc: 'Admin dashboard with application-tracking system', github: 'https://github.com/olaleyeelizabeth11-lab/project', live: 'https://talenthub-six-eta.vercel.app/' },
    { emoji: '🍲', title: 'Nigerian Foods App', desc: 'Real-time search & filtering powered by public API', github: 'https://github.com/olaleyeelizabeth11-lab/Food-API', live: 'https://food-api-red.vercel.app/' },
    { emoji: '🚑', title: 'Ambulance Dispatch UI', desc: 'Complex state transitions & real-time updates', github: 'https://github.com/olaleyeelizabeth11-lab/ambulance', live: 'https://ambulance-alpha.vercel.app/' },
    { emoji: '🍽️', title: 'Catering Landing Page', desc: 'Client discovery & WhatsApp ordering integration', github: 'https://github.com/olaleyeelizabeth11-lab/catering-and-restaurant-service', live: 'https://catering-and-restaurant-ten.vercel.app/' },
  ];

  const achievements = [
    { label: 'Academic Level', value: '✅ Done', icon: '🎓' },
    { label: 'Industrial Training', value: '✅ Done', icon: '🏢' },
    { label: 'Projects', value: '4+', icon: '📱' },
    { label: 'Tech Stack', value: 'MERN', icon: '⚙️' },
  ];

  const funFacts = [
    '💡 Learn by building, not just theory',
    '🌍 Based in Nigeria with global vision',
    '🚀 From foundational to hands-on experience',
    '🎯 Full-stack development focused',
    '📱 Responsive UI specialist',
    '💼 Client-focused problem solver',
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full max-w-5xl">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
      >
        <div className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="h-32 w-32 sm:h-48 sm:w-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
          >
            <img
              src="/images/elizabeth-profile.jpg"
              alt="Olaleye Elizabeth Omosewa"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-white mb-1">Olaleye Elizabeth Omosewa</h1>
            <p className="text-lg sm:text-2xl text-pink-300 font-semibold">Full-Stack Developer</p>
          </div>

          <p className="text-slate-300 leading-7 text-sm sm:text-base">
            I combine formal education with practical industry training to deliver production-ready web applications.
            I learn by <span className="text-purple-300 font-semibold">building real projects</span>, transforming
            foundational knowledge into hands-on expertise.
          </p>

          <div className="flex gap-3 flex-wrap justify-center sm:justify-start pt-2">
            <motion.a whileHover={{ scale: 1.05 }}
              href="https://github.com/olaleyeelizabeth11-lab" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600/50 rounded-lg text-slate-100 text-sm font-medium transition-all">
              GitHub
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }}
              href="https://www.linkedin.com/in/elizabeth-olaleye-1b6102382/" target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600/50 rounded-lg text-slate-100 text-sm font-medium transition-all">
              LinkedIn
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Technical Skillset */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="border-t border-white/10 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">🛠️ Technical Skillset</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skillGroup, idx) => (
            <motion.div key={idx} whileHover={{ y: -4 }}
              className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-white/10 hover:border-purple-500/50 transition-all">
              <p className="font-bold text-purple-300 text-sm mb-2">{skillGroup.category}</p>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, i) => (
                  <span key={i} className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-medium border border-purple-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Projects */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="border-t border-white/10 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">📁 Project Experience</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projectHighlights.map((project, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10 hover:border-pink-500/50 transition-all">
              <div className="text-3xl mb-2">{project.emoji}</div>
              <p className="font-semibold text-white text-sm mb-1">{project.title}</p>
              <p className="text-xs text-slate-400 mb-3">{project.desc}</p>
              <div className="flex gap-2 flex-wrap">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600/50 rounded text-slate-100 transition-all">
                  GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600/50 rounded text-slate-100 transition-all">
                  Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 pt-6">
        {achievements.map((a, idx) => (
          <motion.div key={idx} whileHover={{ y: -4 }}
            className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 text-center hover:border-purple-500/50 transition-all">
            <div className="text-2xl mb-1">{a.icon}</div>
            <div className="text-xs text-slate-400 mb-1">{a.label}</div>
            <div className="text-sm font-bold text-purple-300">{a.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fun Facts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="border-t border-white/10 pt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">💬 About My Approach</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {funFacts.map((fact, idx) => (
            <motion.div key={idx} whileHover={{ x: 4 }}
              className="p-3 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 hover:border-purple-500/50 transition-all">
              {fact}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="border-t border-white/10 pt-6 text-center">
        <h3 className="text-lg sm:text-2xl font-bold text-white mb-3">Ready to Build Something Amazing?</h3>
        <p className="text-slate-300 mb-4 text-sm">I'm available for freelance projects, full-time opportunities, and collaborative ventures.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://wa.me/234912311379" target="_blank" rel="noopener noreferrer"
            className="px-6 py-2 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600/50 text-white text-sm font-semibold rounded-lg transition-all">
            WhatsApp
          </a>
          <a href="mailto:olaleyeelizabeth11@gmail.com"
            className="px-6 py-2 bg-slate-700/60 hover:bg-slate-600/80 border border-slate-600/50 text-white text-sm font-semibold rounded-lg transition-all">
            Email
          </a>
        </div>
      </motion.div>
    </div>
  );
}