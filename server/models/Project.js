import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: String,
  icon: String,
  techStack: [String],
  tags: [String],
  thumbnail: String,
  githubUrl: String,
  liveUrl: String,
  featured: { type: Boolean, default: false },
  category: { type: String, enum: ['Frontend', 'Backend', 'Full Stack', 'Mobile'] },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
