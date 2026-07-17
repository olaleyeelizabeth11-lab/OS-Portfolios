import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TerminalApp() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Welcome to My Dev Terminal v1.0.0',
      timestamp: new Date(),
    },
    {
      type: 'system',
      text: 'Type "help" to see available commands',
      timestamp: new Date(),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => [
      'Available Commands:',
      '  help              - Show this help message',
      '  clear             - Clear the terminal',
      '  whoami            - Display user information',
      '  projects          - List featured projects',
      '  skills            - Display top skills',
      '  contact           - Get contact information',
      '  date              - Show current date and time',
      '  pwd               - Print working directory',
      '  ls -la            - List portfolio items',
      '  sudo hire me      - 🎯 SPECIAL COMMAND!',
      '  echo <text>       - Echo text to terminal',
      '  joke              - Get a developer joke 😄',
      '  matrix            - Watch The Matrix rain ✨',
    ],
    clear: () => {
      setHistory([]);
      return null;
    },
    whoami: () => [
      'user@portfolio:~$',
      'Name: Olaleye Elizabeth Omosewa',
      'Title: Full-Stack Engineer',
      'Location: Ogbomosho, OYO',
      'Experience: 1+ years',
      'Status: Open to opportunities ✓',
      'Availability: Immediate',
    ],
    projects: () => [
      'Featured Projects:',
      '  ┌─ 🖥️  Win11 Portfolio Shell',
      '  ├─ 📊  Catering Landing Page',
      '  ├─ ⚙️  Nigerian Foods App ',
      '  └─ 🛒 Full-Stack Job Recruitment Portal ',
      '',
      'Type "projects" for full project explorer!',
    ],
    skills: () => [
      'Top Skills:',
      '  ◆ React/TypeScript    98%',
      '  ◆ Node.js/Express     96%',
      '  ◆ PostgreSQL/MongoDB  89%',
      '  ◆ AWS/Docker          88%',
      '  ◆ System Design       95%',
      '',
      'Full breakdown available in Skills app!',
    ],
    contact: () => [
      'Contact Information:',
      '  📧 Email:    olaleyeelizabeth11@email.com',
      '  📱 Phone:    (+234) 912-311-3799',
      '  🔗 LinkedIn: linkedin.com/in/elizabeth-olaleye-1b6102382/',
      '  🐙 GitHub:   github.com/olaleyeelizabeth11-lab',
      '  🌐 Website:  OS-Portfolio.dev',
      '',
      'Open Contact app for the form!',
    ],
    pwd: () => ['/home/Elizabeth/portfolio'],
    'ls -la': () => [
      'total 48',
      'drwxr-xr-x  8 Elizabeth staff  256 Jun 2 2026 .',
      'drwxr-xr-x  3 root root   96 Jun 2 2026 ..',
      '-rw-r--r--  1 Elizabeth staff 2048 Jun 2 2026 AboutMe.exe',
      '-rw-r--r--  1 Elizabeth staff 3072 Jun 2 2026 Projects.exe',
      '-rw-r--r--  1 Elizabeth staff 1536 Jun 2 2026 Skills.exe',
      '-rw-r--r--  1 Elizabeth staff 2560 Jun 2 2026 Resume.pdf',
      '-rw-r--r--  1 Elizabeth staff 1792 Jun 2 2026 Contact.exe',
      '-rw-r--r--  1 Elizabeth staff  512 Jun 2 2026 .secret',
    ],
    date: () => [new Date().toString()],
    joke: () => [
      '❯ Why do programmers prefer dark mode?',
      '',
      '  Because light attracts bugs! 🪲',
      '',
      '  ---',
      '',
      'Want another? Type "joke" again!',
    ],
    matrix: () => [
      '🟢 01100101 01101110 01110100 01100101 01110010',
      '🟢 01110100 01101000 01100101 01101101 01100001',
      '🟢 01110100 01110010 01101001 01111000',
      '🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢',
      '🟢 01101100 01101111 01100001 01100100 01101001',
      '🟢 01101110 01100111 01110000 01100001 01100111',
      '🟢 01100101 01101001 01101110 01110000 01100101',
      '🟢 01101101 01100001 01110100 01100101 01101110',
      '🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢',
      '',
      'You\'ve taken the red pill! 🔴',
    ],
    'sudo hire me': () => [
      '🎯 HIRING PROTOCOL INITIATED 🎯',
      '',
      'Processing candidate: Olaleye Elizabeth Omosewa...',
      '⌛ Scanning resume... 10%',
      '⌛ Evaluating skills... 45%',
      '⌛ Checking GitHub contributions... 78%',
      '⌛ Finalizing offer... 99%',
      '',
      '═══════════════════════════════════════════',
      '✅ AUTHORIZATION GRANTED!',
      '═══════════════════════════════════════════',
      '',
      'Assessment Result: EXCEPTIONAL',
      'Recommendation: HIRE IMMEDIATELY',
      '',
      'You are an incredible developer! 🚀',
      'Let\'s build something amazing together!',
      '',
      'Next steps:',
      '  → Email: olaleyeelizabeth11@gmail.com',
      '  → Phone: (234) 912-311-3799',
      '  → LinkedIn: Ready to discuss opportunities',
      '',
      'Ready to start? Let\'s make it happen!',
    ],
  };

  const parseCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === '') return [];

    // Handle echo command
    if (trimmed.startsWith('echo ')) {
      return [trimmed.substring(5)];
    }

    // Handle other commands
    if (commands[trimmed]) {
      const result = commands[trimmed]();
      if (result === null) {
        return [];
      }
      return result;
    }

    return [`command not found: ${trimmed}`, 'Type "help" for available commands'];
  };

  const handleCommand = () => {
    if (!input.trim()) return;

    // Add user input to history
    const newEntry = {
      type: 'input',
      text: `$ ${input}`,
      timestamp: new Date(),
    };

    setHistory((prev) => [...prev, newEntry]);
    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);

    // Process command
    const output = parseCommand(input);
    if (output.length > 0) {
      output.forEach((line) => {
        setHistory((prev) => [
          ...prev,
          {
            type: 'output',
            text: line,
            timestamp: new Date(),
          },
        ]);
      });
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 font-mono">
      {/* Terminal Header */}
      <div className="p-3 border-b border-white/10 bg-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-400">⊘</span>
          <span className="text-xs text-slate-400">Terminal - ~/portfolio</span>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-red-500" />
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-1 text-sm"
      >
        {history.map((entry, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              entry.type === 'input'
                ? 'text-green-400'
                : entry.type === 'system'
                ? 'text-cyan-400'
                : 'text-slate-300'
            }`}
          >
            <span className="font-semibold">{entry.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Terminal Input */}
      <div className="border-t border-white/10 p-4 space-y-2">
        <div className="flex items-center gap-2 text-green-400 font-mono">
          <span>$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command..."
            autoFocus
            className="flex-1 bg-transparent text-green-400 focus:outline-none placeholder-slate-600"
          />
        </div>
        <p className="text-xs text-slate-500">
          💡 Tip: Try typing "help" or "sudo hire me" for Easter egg!
        </p>
      </div>
    </div>
  );
}
