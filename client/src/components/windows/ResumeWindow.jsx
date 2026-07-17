export default function ResumeWindow() {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Your Name</h2>
        <p className="text-slate-400 mb-4">Full-Stack Developer</p>
        <div className="flex justify-center gap-4 text-sm text-blue-400">
          <a href="mailto:your.email@example.com" className="hover:underline">email@example.com</a>
          <span className="text-slate-600">•</span>
          <span>Your City, State</span>
          <span className="text-slate-600">•</span>
          <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-8900</a>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-bold text-white mb-3">EXPERIENCE</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-white">Senior Developer</h4>
              <span className="text-xs text-slate-400">2022 - Present</span>
            </div>
            <p className="text-sm text-slate-400 mb-1">Tech Company Inc.</p>
            <p className="text-sm text-slate-500">Led development of full-stack applications serving 100k+ users</p>
          </div>
          <div>
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-white">Full-Stack Developer</h4>
              <span className="text-xs text-slate-400">2020 - 2022</span>
            </div>
            <p className="text-sm text-slate-400 mb-1">Startup Studio</p>
            <p className="text-sm text-slate-500">Built React/Node.js applications from scratch</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-bold text-white mb-3">SKILLS</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-white mb-2">Frontend</p>
            <p className="text-slate-400">React, TypeScript, Tailwind, Framer Motion</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">Backend</p>
            <p className="text-slate-400">Node.js, Express, PostgreSQL, MongoDB</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-bold text-white mb-3">EDUCATION</h3>
        <div>
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-white">Bachelor of Science in Computer Science</h4>
            <span className="text-xs text-slate-400">2020</span>
          </div>
          <p className="text-sm text-slate-400">University Name</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button className="px-6 py-2 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30 text-sm font-medium">
          📥 Download PDF
        </button>
        <button className="px-6 py-2 bg-slate-800/50 text-slate-300 rounded hover:bg-slate-800 text-sm font-medium">
          🔗 View Online
        </button>
      </div>
    </div>
  );
}
