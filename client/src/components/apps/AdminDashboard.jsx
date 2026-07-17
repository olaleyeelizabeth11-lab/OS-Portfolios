import { useEffect, useMemo, useState } from 'react';
import api from '../../api/api';

const initialForm = {
  title: '',
  description: '',
  longDescription: '',
  techStack: '',
  thumbnail: '',
  githubUrl: '',
  liveUrl: '',
  featured: false,
  category: 'Frontend',
};

export default function AdminDashboard({ onClose }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data.projects || []);
    } catch (err) {
      setError('Unable to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setForm({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || '',
      techStack: (project.techStack || []).join(', '),
      thumbnail: project.thumbnail || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured,
      category: project.category || 'Frontend',
    });
    setMessage('Editing project');
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setForm(initialForm);
    setMessage('Create new project');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project._id !== id));
      setMessage('Project deleted');
    } catch (err) {
      setError('Unable to delete project.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const payload = {
      ...form,
      techStack: form.techStack.split(',').map((item) => item.trim()).filter(Boolean),
    };

    try {
      if (selectedProject) {
        const response = await api.put(`/api/projects/${selectedProject._id}`, payload);
        setProjects((prev) => prev.map((project) => (project._id === response.data._id ? response.data : project)));
        setMessage('Project updated successfully.');
      } else {
        const response = await api.post('/api/projects', payload);
        setProjects((prev) => [response.data, ...prev]);
        setMessage('Project created successfully.');
        setForm(initialForm);
      }
    } catch (err) {
      setError('Unable to save project.');
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const response = await api.put(`/api/projects/${project._id}`, {
        ...project,
        featured: !project.featured,
      });
      setProjects((prev) => prev.map((item) => (item._id === response.data._id ? response.data : item)));
    } catch (err) {
      setError('Unable to toggle featured.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    window.location.reload();
  };

  const projectCount = projects.length;

  return (
    <div className="h-full overflow-auto bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 p-4">
        <div>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-slate-400">Hidden admin panel for project CRUD and settings.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreate}
            className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400"
          >
            New Project
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] p-4">
        <aside className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-xl">
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-[0.25em] text-slate-400">Overview</h2>
            <p className="text-4xl font-bold text-white">{projectCount}</p>
            <p className="text-sm text-slate-400">Total projects</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCreate}
              className="w-full rounded-3xl bg-slate-800 px-4 py-3 text-sm text-white hover:bg-slate-700"
            >
              Add New Project
            </button>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
              <h3 className="text-sm font-semibold text-white">Tips</h3>
              <p className="mt-2 leading-6 text-slate-400">
                Use the form to add projects, then manage them in the Projects table. Featured items appear first in the portfolio.
              </p>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white">Project Editor</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block text-sm text-slate-200">
                  Title
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </label>
                <label className="block text-sm text-slate-200">
                  Category
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Full Stack</option>
                    <option>Mobile</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm text-slate-200">
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  rows="3"
                />
              </label>

              <label className="block text-sm text-slate-200">
                Long Description
                <textarea
                  name="longDescription"
                  value={form.longDescription}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  rows="4"
                />
              </label>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block text-sm text-slate-200">
                  Tech Stack (comma separated)
                  <input
                    name="techStack"
                    value={form.techStack}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </label>
                <label className="block text-sm text-slate-200">
                  Thumbnail URL
                  <input
                    name="thumbnail"
                    value={form.thumbnail}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block text-sm text-slate-200">
                  GitHub URL
                  <input
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </label>
                <label className="block text-sm text-slate-200">
                  Live URL
                  <input
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <label className="inline-flex items-center gap-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-white/20 bg-slate-800 text-blue-500"
                />
                Featured project
              </label>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-3xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400" type="submit">
                  {selectedProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    setForm(initialForm);
                    setError('');
                    setMessage('');
                  }}
                  className="rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-200 hover:bg-white/10"
                >
                  Reset
                </button>
              </div>

              {(error || message) && (
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-200">
                  {error ? <p className="text-red-400">{error}</p> : <p className="text-slate-300">{message}</p>}
                </div>
              )}
            </form>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Projects</h2>
              <span className="text-sm text-slate-400">{loading ? 'Loading…' : `${projectCount} total`}</span>
            </div>
            <div className="mt-6 space-y-4">
              {projects.map((project) => (
                <div key={project._id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">{project.title}</h3>
                      <p className="text-sm text-slate-400">{project.category || 'Uncategorized'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="rounded-2xl bg-blue-500 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="rounded-2xl bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-400"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(project)}
                        className="rounded-2xl bg-slate-700 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-600"
                      >
                        {project.featured ? 'Unfeature' : 'Feature'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
