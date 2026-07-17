export default function About() {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">About Me</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          I’m a full-stack developer who crafts desktop-inspired interfaces and responsive web experiences. I enjoy building UIs with motion, clean structure, and strong accessibility.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Core Technologies</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>• React.js with Hooks</li>
            <li>• React Router v6</li>
            <li>• Express.js REST APIs</li>
            <li>• Tailwind CSS + custom glassmorphism</li>
            <li>• Framer Motion animations</li>
          </ul>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Development Style</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            I focus on modern Windows-like UX with soft gradients, glass panels, animated states, and seamless transitions across the portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}
