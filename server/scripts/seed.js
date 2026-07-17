import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import User from '../models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in environment');
  process.exit(1);
}

const projects = [
  {
    title: 'Job Recruitment Portal',
    description: 'Admin dashboard with application-tracking system for managing job applicants and hiring workflows.',
    longDescription: 'Complete job recruitment platform with admin dashboard, application tracking system, candidate management, and hiring workflow automation.',
    icon: '💼',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/olaleyeelizabeth11-lab/project',
    liveUrl: 'https://talenthub-six-eta.vercel.app/',
    featured: true,
    category: 'Full Stack',
  },
  {
    title: 'Nigerian Foods App',
    description: 'Real-time search & filtering powered by public API with detailed food information and nutritional data.',
    longDescription: 'Application showcasing Nigerian cuisines with real-time search, filtering by categories, and detailed food information from public APIs.',
    icon: '🍲',
    techStack: ['React', 'API Integration', 'Tailwind CSS', 'Vercel'],
    tags: ['React', 'API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/olaleyeelizabeth11-lab/Food-API',
    liveUrl: 'https://food-api-red.vercel.app/',
    featured: true,
    category: 'Frontend',
  },
  {
    title: 'Ambulance Dispatch UI',
    description: 'Complex state transitions & real-time updates for emergency response management system.',
    longDescription: 'Emergency response management system with real-time ambulance tracking, dispatch management, and complex state transitions.',
    icon: '🚑',
    techStack: ['React', 'Framer Motion', 'Real-time Updates', 'Tailwind CSS'],
    tags: ['React', 'Framer Motion', 'Real-time'],
    githubUrl: 'https://github.com/olaleyeelizabeth11-lab/ambulance',
    liveUrl: 'https://ambulance-alpha.vercel.app/',
    featured: true,
    category: 'Frontend',
  },
  {
    title: 'Catering Landing Page',
    description: 'Client discovery & WhatsApp ordering integration for catering and restaurant service business.',
    longDescription: 'Professional landing page for catering and restaurant services with WhatsApp ordering integration for seamless customer communication.',
    icon: '🍽️',
    techStack: ['React', 'Responsive Design', 'Integration', 'Tailwind CSS'],
    tags: ['React', 'Responsive', 'Integration'],
    githubUrl: 'https://github.com/olaleyeelizabeth11-lab/catering-and-restaurant-service',
    liveUrl: 'https://catering-and-restaurant-ten.vercel.app/',
    featured: true,
    category: 'Frontend',
  },
];

const adminUser = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'password123',
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    await Project.deleteMany({});
    await User.deleteMany({});

    const projectDocs = await Project.create(projects);
    console.log(`Seeded ${projectDocs.length} projects`);

    const passwordHash = await bcrypt.hash(adminUser.password, 10);
    const userDoc = await User.create({ email: adminUser.email, passwordHash });
    console.log(`Created admin user: ${userDoc.email}`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  }
}

seed();
