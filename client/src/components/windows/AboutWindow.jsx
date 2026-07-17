export default function AboutWindow() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div className="h-32 w-32 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold">
            YN
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">Your Name</h2>
          <p className="text-sm text-slate-300 mb-4">Full-Stack Developer & Creative Technologist</p>
          <p className="text-sm leading-6 text-slate-400">
            I craft polished, performant full-stack experiences with a focus on clean design and intuitive interactions. 
            I'm passionate about building beautiful web applications that feel responsive and modern.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Bio</h3>
        <p className="text-sm leading-6 text-slate-400">
          With expertise in React, Node.js, and full-stack development, I specialize in creating web experiences 
          that combine aesthetics with functionality. I'm always exploring new technologies and pushing the boundaries 
          of what's possible on the web.
        </p>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold text-white mb-3">Quick Facts</h3>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>• Based in [Your City]</li>
          <li>• [X] years of development experience</li>
          <li>• Open to freelance & full-time opportunities</li>
          <li>• Love working on challenging projects</li>
        </ul>
      </div>
    </div>
  );
}
