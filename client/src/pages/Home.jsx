import { ChevronRightIcon } from '@fluentui/react-icons-mdl2';
import { motion } from 'framer-motion';
import { AppStoreLogo24Regular, Document24Regular, Sparkle24Regular } from '@fluentui/react-icons-mdl2';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
            <AppStoreLogo24Regular className="h-5 w-5 text-sky-300" /> Windows 11 Experience
          </span>
          <h1 className="text-4xl font-semibold text-white">Hi, I’m Your Name.</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            I build polished, performant full-stack experiences that feel clean, intuitive, and modern. This portfolio is styled as a Windows 11 desktop shell with animated window interactions.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Apps & Projects',
            description: 'Modern web apps, dashboards, and components built with React, Node.js, and cloud-friendly APIs.',
            icon: <Document24Regular className="h-6 w-6 text-cyan-300" />,
          },
          {
            title: 'Design System',
            description: 'Fluent-inspired UI, motion-led transitions, and Windows-like polished layouts.',
            icon: <Sparkle24Regular className="h-6 w-6 text-sky-300" />,
          },
          {
            title: 'API & Backend',
            description: 'REST endpoints, Express middleware, and server logic to power interactive portfolio experiences.',
            icon: <AppStoreLogo24Regular className="h-6 w-6 text-slate-200" />,
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -6 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl"
          >
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900/70">
              {card.icon}
            </div>
            <h2 className="text-xl font-semibold text-white">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
