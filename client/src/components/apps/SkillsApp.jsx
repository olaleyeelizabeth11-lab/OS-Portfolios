import { motion } from 'framer-motion';

export default function SkillsApp() {
  const skillCategories = [
    {
      category: 'Frontend Development',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 98, desc: 'Hooks, Context, Performance optimization' },
        { name: 'TypeScript', level: 92, desc: 'Type safety & advanced patterns' },
        { name: 'Tailwind CSS', level: 95, desc: 'Responsive design & theming' },
        { name: 'Framer Motion', level: 90, desc: 'Complex animations & interactions' },
        { name: 'Next.js', level: 88, desc: 'SSR, SSG, API routes' },
        { name: 'Vue.js', level: 85, desc: 'Composition API, Nuxt' },
      ]
    },
    {
      category: 'Backend Development',
      icon: '⚙️',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Node.js', level: 96, desc: 'Event-driven architecture' },
        { name: 'Express.js', level: 94, desc: 'Middleware, routing, authentication' },
        { name: 'PostgreSQL', level: 89, desc: 'Complex queries, optimization' },
        { name: 'MongoDB', level: 87, desc: 'Document design, aggregation' },
        { name: 'GraphQL', level: 85, desc: 'Schema design, resolvers' },
        { name: 'REST APIs', level: 96, desc: 'RESTful principles, documentation' },
      ]
    },
    {
      category: 'Soft Skills & Process',
      icon: '💬',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Problem Solving', level: 97, desc: 'Breaking down complex issues' },
        { name: 'Team Leadership', level: 91, desc: 'Mentoring & code reviews' },
        { name: 'Project Management', level: 88, desc: 'Agile, Scrum, planning' },
        { name: 'Communication', level: 93, desc: 'Clear documentation & presentations' },
        { name: 'Technical Writing', level: 89, desc: 'Blogs, guides, documentation' },
        { name: 'Open Source', level: 90, desc: 'Contributing & maintaining' },
      ]
    },
  ];

  const SkillBar = ({ name, level, desc }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-1"
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-sm font-semibold text-slate-300">{name}</span>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
        <span className="text-xs text-slate-400 font-bold flex-shrink-0 ml-2">{level}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
        />
      </div>
    </motion.div>
  );

  return (
    <div className="p-8 space-y-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Skills & Expertise</h1>
        <p className="text-slate-400">
          Here's a breakdown of my technical abilities and proficiencies across different areas.
        </p>
      </motion.div>

      {skillCategories.map((category, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="space-y-6 p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          {/* Category Header */}
          <div className="flex items-center gap-3">
            <div className={`text-3xl p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
              {category.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{category.category}</h2>
              <p className="text-xs text-slate-400">
                {category.skills.length} skills • Average: {Math.round(category.skills.reduce((a, s) => a + s.level, 0) / category.skills.length)}%
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {category.skills.map((skill, i) => (
              <SkillBar key={i} name={skill.name} level={skill.level} desc={skill.desc} />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Proficiency Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-4 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-sm space-y-2"
      >
        <p className="font-semibold text-white">Proficiency Levels:</p>
        <div className="grid grid-cols-2 gap-2">
          <p>✓ 90-100%: Expert</p>
          <p>✓ 80-89%: Advanced</p>
          <p>✓ 70-79%: Intermediate</p>
          <p>✓ Below 70%: Learning</p>
        </div>
      </motion.div>
    </div>
  );
}
