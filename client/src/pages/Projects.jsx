export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Projects</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Explore a curated selection of web applications, design systems, and backend services.
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {[
          {
            title: 'Win11 Portfolio Shell',
            description: 'A fully themed portfolio experience with lock screen, login flow, and Windows-inspired desktop UI.',
            tags: ['React', 'Tailwind', 'Framer Motion'],
          },
          {
            title: 'Task Manager Dashboard',
            description: 'System-inspired dashboard with interactive cards, performance charts, and service statuses.',
            tags: ['React', 'Charting', 'API'],
          },
          {
            title: 'Developer API Service',
            description: 'REST API backend demonstrating auth-ready endpoints and portfolio data delivery.',
            tags: ['Node.js', 'Express', 'JSON'],
          },
        ].map((project) => (
          <div key={project.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">{project.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
