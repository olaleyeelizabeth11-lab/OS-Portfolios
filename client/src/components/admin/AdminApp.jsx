import { useEffect, useState } from 'react';
import api from '../../api/api';
import AdminDashboard from '../apps/AdminDashboard';

export default function AdminApp() {
  const [token, setToken] = useState(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('portfolio_admin_token');
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  useEffect(() => {
    if (!token) return;

    const validateToken = async () => {
      setLoading(true);
      try {
        await api.get('/api/projects');
        setError('');
      } catch (err) {
        localStorage.removeItem('portfolio_admin_token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/auth/login', credentials);
      localStorage.setItem('portfolio_admin_token', response.data.token);
      setToken(response.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-950 text-slate-100">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center">
          <p className="text-lg font-semibold">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (token) {
    return <AdminDashboard />;
  }

  return (
    <div className="flex h-full items-center justify-center bg-slate-950 text-slate-100">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-400">Enter your admin credentials to manage projects.</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <label className="block text-sm text-slate-200">
            Email
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </label>
          <label className="block text-sm text-slate-200">
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-3xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-400"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  );
}
