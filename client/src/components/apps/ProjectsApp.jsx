import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

function ProjectCard({ project, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={`p-4 rounded-xl border transition-all ${
        isSelected
          ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border-blue-400/60'
          : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
      }`}
    >
      <div className="text-4xl mb-3">{project.icon}</div>
      <h3 className="font-bold text-white mb-1 text-sm">{project.title}</h3>
      <p className="text-xs text-slate-400 line-clamp-2 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.tags?.slice(0, 3).map((tag, i) => (
          <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-xs text-blue-400 mt-2 font-medium">Tap to view details →</p>
    </div>
  );
}

const FALLBACK_PROJECTS = [
  {
    id: 'job-recruitment',
    title: 'Job Recruitment Portal',
    description: 'Admin dashboard with application-tracking system for managing job applicants and hiring workflows.',
    longDescription: 'Complete job recruitment platform with admin dashboard, application tracking system, candidate management, and hiring workflow automation.',
    icon: '💼',
    tags: ['React', 'Node.js', 'MongoDB'],
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/olaleyeelizabeth11-lab/project',
    liveUrl: 'https://talenthub-six-eta.vercel.app/',
    category: 'Full Stack',
  },
  {
    id: 'nigerian-foods',
    title: 'Nigerian Foods App',
    description: 'Real-time search & filtering powered by public API with detailed food information and nutritional data.',
    longDescription: 'Application showcasing Nigerian cuisines with real-time search, filtering by categories, and detailed food information from public APIs.',
    icon: '🍲',
    tags: ['React', 'API Integration', 'Tailwind CSS'],
    techStack: ['React', 'API Integration', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/olaleyeelizabeth11-lab/Food-API',
    liveUrl: 'https://food-api-red.vercel.app/',
    category: 'Frontend',
  },
  {
    id: 'ambulance-dispatch',
    title: 'Ambulance Dispatch UI',
    description: 'Complex state transitions & real-time updates for emergency response management system.',
    longDescription: 'Emergency response management system with real-time ambulance tracking, dispatch management, and complex state transitions.',
    icon: '🚑',
    tags: ['React', 'Real-time', 'Framer Motion'],
    techStack: ['React', 'Framer Motion', 'Real-time Updates', 'Tailwind CSS'],
    githubUrl: 'https://github.com/olaleyeelizabeth11-lab/ambulance',
    liveUrl: 'https://ambulance-alpha.vercel.app/',
    category: 'Frontend',
  },
  {
    id: 'catering-landing',
    title: 'Catering Landing Page',
    description: 'Client discovery & WhatsApp ordering integration for catering and restaurant service business.',
    longDescription: 'Professional landing page for catering and restaurant services with WhatsApp ordering integration for seamless customer communication.',
    icon: '🍽️',
    tags: ['React', 'Responsive Design', 'Integration'],
    techStack: ['React', 'Responsive Design', 'Integration', 'Tailwind CSS'],
    githubUrl: 'https://github.com/olaleyeelizabeth11-lab/catering-and-restaurant-service',
    liveUrl: 'https://catering-and-restaurant-ten.vercel.app/',
    category: 'Frontend',
  },
];

export default function ProjectsApp() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/projects');
        if (response.ok) {
          const data = await response.json();
          const normalizedProjects = (data.projects || []).map(p => ({
            ...p,
            id: p._id || p.id,
            techStack: Array.isArray(p.techStack) ? p.techStack : (p.tags || []),
            liveUrl: p.liveUrl || p.url || p.projectUrl || '',
            githubUrl: p.githubUrl || p.github || '',
          }));
          if (normalizedProjects.length > 0) setProjects(normalizedProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleCardClick = (project, e) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  const closeModal = () => setSelectedProject(null);

  // ✅ Responsive modal sizing
  const isSmallScreen = window.innerWidth < 500;
  const modalStyle = {
    position: 'fixed',
    zIndex: 10000,
    background: '#0f172a',
    border: '1px solid rgba(255,255,255,0.15)',
    overflowY: 'auto',
    boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
    // Small screen — full screen modal
    ...(isSmallScreen ? {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 0,
    } : {
      // Large screen — centered modal
      top: '5%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '580px',
      maxHeight: '88vh',
      borderRadius: '16px',
    }),
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-950 to-slate-900">

      {/* Toolbar */}
      <div className="px-3 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">📁</span>
          <span className="text-sm text-slate-400">Projects</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setViewMode('list')}
            className={`p-2 rounded text-sm ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-400 hover:text-white'}`}>
            ≡
          </button>
          <button onClick={() => setViewMode('grid')}
            className={`p-2 rounded text-sm ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-300' : 'text-slate-400 hover:text-white'}`}>
            ⊞
          </button>
        </div>
      </div>

      {/* Projects Grid / List */}
      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-5xl animate-spin">⏳</div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProject?.id === project.id}
                onClick={(e) => handleCardClick(project, e)}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL via Portal */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                style={{
                  position: 'fixed', inset: 0,
                  zIndex: 9999,
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(4px)',
                }}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={modalStyle}
              >
                {/* ✅ Sticky close button for small screens */}
                <div style={{
                  position: 'sticky', top: 0, zIndex: 1,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px',
                  background: '#0f172a',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '28px' }}>{selectedProject.icon}</span>
                    <div>
                      <h2 style={{ color: 'white', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>
                        {selectedProject.title}
                      </h2>
                      <span style={{
                        fontSize: '10px', padding: '1px 8px', borderRadius: '999px',
                        background: 'rgba(59,130,246,0.2)', color: '#93c5fd',
                        border: '1px solid rgba(59,130,246,0.3)', display: 'inline-block', marginTop: '3px',
                      }}>
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                  <button onClick={closeModal} style={{
                    color: '#94a3b8', background: 'rgba(255,255,255,0.1)',
                    border: 'none', fontSize: '16px', cursor: 'pointer',
                    padding: '6px 10px', borderRadius: '8px',
                  }}>
                    ✕
                  </button>
                </div>

                {/* Scrollable Content */}
                <div style={{ padding: '16px' }}>

                  {/* About */}
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px', fontWeight: '600' }}>
                      About
                    </p>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.7' }}>
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px', fontWeight: '600' }}>
                      Tech Stack
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {selectedProject.techStack?.map((tech, idx) => (
                        <span key={idx} style={{
                          fontSize: '11px', padding: '3px 10px', borderRadius: '999px',
                          background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd',
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links text */}
                  {selectedProject.liveUrl && (
                    <div style={{ marginBottom: '6px', fontSize: '11px' }}>
                      <span style={{ color: '#64748b' }}>Live: </span>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#67e8f9', textDecoration: 'underline', wordBreak: 'break-all' }}>
                        {selectedProject.liveUrl}
                      </a>
                    </div>
                  )}
                  {selectedProject.githubUrl && (
                    <div style={{ marginBottom: '16px', fontSize: '11px' }}>
                      <span style={{ color: '#64748b' }}>Repo: </span>
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#67e8f9', textDecoration: 'underline', wordBreak: 'break-all' }}>
                        {selectedProject.githubUrl}
                      </a>
                    </div>
                  )}

                  {/* Buttons */}
                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '14px',
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    gap: '10px',
                  }}>
                    {selectedProject.liveUrl ? (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                        style={{
                          flex: 1, padding: '12px', borderRadius: '8px',
                          background: '#2563eb', color: 'white',
                          textDecoration: 'none', textAlign: 'center',
                          fontSize: '13px', fontWeight: '600', display: 'block',
                        }}>
                        🔗 View Live Demo
                      </a>
                    ) : (
                      <div style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'rgba(51,65,85,0.4)', color: '#64748b', textAlign: 'center', fontSize: '13px' }}>
                        🔗 No Live Demo
                      </div>
                    )}
                    {selectedProject.githubUrl ? (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                        style={{
                          flex: 1, padding: '12px', borderRadius: '8px',
                          background: '#334155', color: '#e2e8f0',
                          textDecoration: 'none', textAlign: 'center',
                          fontSize: '13px', fontWeight: '600', display: 'block',
                        }}>
                        🐙 Source Code
                      </a>
                    ) : (
                      <div style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'rgba(51,65,85,0.4)', color: '#64748b', textAlign: 'center', fontSize: '13px' }}>
                        🐙 No Repository
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}