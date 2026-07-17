import { motion } from 'framer-motion';

export default function ResumeApp() {
  const sections = [
    {
      title: 'Professional Summary',
      icon: '📋',
      content:
        'Full-stack developer with 1+ years of proven experience building scalable web applications, leading technical teams, and mentoring junior developers. Expertise in React, Node.js, MongoDB, and cloud infrastructure. Track record of delivering high-impact products used by Fortune companies.',
    },
    {
      title: 'Experience',
      icon: '💼',
      items: [
  {
    role: 'Software Engineering Intern & Technical Instructor',
    company: 'SQI College of ICT',
    duration: '1 Year 2025-2026', 
    achievements: [
      'Delivered structured lectures and practical training in Full-Stack Web Development to classes of 30+ students',
      'Mentored and graded student projects, conducting debugging sessions that improved class-wide code comprehension',
      'Assisted in the development of internal school portal modules using modern JavaScript frameworks',
      'Organized weekly coding challenges and technical workshops to foster collaboration and clean code practices'
    ]
  },
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Contract & Self-Employed',
    duration: '2025 - Present',
    achievements: [
      'Designed and deployed custom web applications for diverse clients, aligning features with business requirements',
      'Integrated secure third-party payment gateways (e.g., Paystack, Flutterwave) and WhatsApp ordering APIs',
      'Optimized client website loading speeds by up to 35% using lazy loading, modern asset compression, and clean Tailwind styling',
      'Managed end-to-end project lifecycles including database design, frontend implementation, and cloud deployment'
    ]
  },
  {
    role: 'Lead Developer (Final Year Project)',
    company: 'Ladoke Akintola University of Technology (LAUTECH)',
    duration: 'Finalist / Present',
    achievements: [
      'Architected and implemented a high-performance system as a core part of academic research and final graduation project',
      'Collaborated with a project team to write comprehensive technical documentation, database schemas, and system workflows',
      'Presented technical demonstrations to faculty panels, defending architectural decisions and system security measures'
    ]
  }
]
    },
    {
      title: 'Education',
      icon: '🎓',
      items: [
        {
          role: 'Bachelor of Technology in Computer Science',
          company: 'State University',
          duration: '2014 - 2018',
          achievements: ['GPA: 4.90', 'Dean\'s List (All 5 Years)', 'Computer Science Excellence Award', 'Valedictorian - Class of 2027'],
        },
      ],
    },
    {
      title: 'Certifications & Achievements',
      icon: '🏆',
      items:[
  { 
    role: 'Software Engineer Professional', 
    company: 'SQI College of ICT', 
    duration: '2026' 
  },
  { 
    role: 'B.Tech Computer Engineering', 
    company: 'Ladoke Akintola University of Technology (LAUTECH)', 
    duration: '2027' 
  },
]
    },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Resume Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-1">Olaleye Elizabeth Omosewa</h1>
            <p className="text-cyan-300 font-medium">Full-Stack Engineer</p>
            <p className="text-slate-400 text-sm mt-2">
              📧 olaleyeelizabeth11@gmail.com • 📱 (234) 912-311-3799 • 🔗linkedin.com/in/elizabeth-olaleye-1b6102382/ • 🐙 github.com/olaleyeelizabeth11-lab
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/public/resume/Elizabeth_Olaleye_Resume.pdf"
            download="Elizabeth_Olaleye_Resume.pdf"
            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-300 text-sm font-medium transition-colors flex-shrink-0"
          >
             Download PDF
          </motion.a>
        </div>
        <div className="flex gap-2 flex-wrap text-xs">
          {['Ogbomosho, OYO', 'Available for Opportunities', 'Remote Work Preferred'].map((badge, i) => (
            <span key={i} className="px-2 py-1 rounded-full bg-white/10 text-slate-400">
              {badge}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Resume Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {sections.map((section, sectionIdx) => (
          <motion.div
            key={sectionIdx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: sectionIdx * 0.1 }}
            className="space-y-4"
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-500/50">
              <span className="text-2xl">{section.icon}</span>
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
            </div>

            {/* Section Content */}
            {section.content ? (
              <p className="text-slate-300 leading-7">{section.content}</p>
            ) : (
              <div className="space-y-6">
                {section.items?.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{item.role}</h3>
                        <p className="text-sm text-cyan-300">{item.company}</p>
                      </div>
                      <span className="text-xs text-slate-400 font-medium flex-shrink-0">{item.duration}</span>
                    </div>
                    {item.achievements && (
                      <ul className="space-y-1 mt-3">
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-cyan-400 flex-shrink-0 mt-0.5">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        </div>

        {/* Skills Summary Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 rounded-lg border-t-2 border-blue-500/50 bg-blue-500/10"
        >
          <h3 className="text-sm font-bold text-white mb-2">💪 Core Competencies</h3>
          <div className="flex flex-wrap gap-2">
            {/* {[ */}
              {/* // 'React',3">💪 Technical Skills</h3> */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-2">Languages & Frameworks</p>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Node.js', 'GraphQL', 'REST APIs'].map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 border border-blue-500/30 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-2">Databases & Tools</p>
              <div className="flex flex-wrap gap-2">
                {['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Git', ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 border border-cyan-500/30 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
    </div>
            </div>
            </motion.div>
            </div>
    
  );
}
