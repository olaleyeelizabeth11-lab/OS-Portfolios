import { motion } from 'framer-motion';

export default function SkillsWindow() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Framer Motion', level: 88 },
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 93 },
        { name: 'Express', level: 91 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 87 },
      ]
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Git', level: 92 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 78 },
        { name: 'CI/CD', level: 85 },
      ]
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-white">Skills & Expertise</h2>

      {skillCategories.map((category, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
            {category.category}
          </h3>

          {category.skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 + i * 0.1 }}
              className="space-y-1"
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                <span className="text-xs text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.2 + i * 0.1 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ))}

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold text-white mb-3">Other Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['RESTful APIs', 'GraphQL', 'Testing (Jest)', 'Web Performance', 'Responsive Design', 'Accessibility', 'Problem Solving', 'Team Collaboration'].map((skill, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-slate-800/50 text-slate-300 text-sm hover:bg-blue-500/20 transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
