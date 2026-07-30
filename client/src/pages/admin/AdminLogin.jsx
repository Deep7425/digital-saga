import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { apiFetch, setAdminToken } from '../../lib/api';
import '../../styles/admin.css';

const AdminLogin = () => {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          data?.message ||
          (data?.errors?.email && data.errors.email[0]) ||
          'Unable to sign in. Check your credentials.';
        setError(msg);
        return;
      }
      if (data.token) {
        setAdminToken(data.token);
        navigate('/admin');
      }
    } catch {
      setError('Network error. Is the API server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root d-flex align-items-center justify-content-center px-3 py-5">
      <motion.div
        className="admin-glass p-4 p-md-5"
        style={{ width: '100%', maxWidth: 420 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-4">
          <div className="admin-logo-mark mx-auto mb-3">DS</div>
          <h1 className="h4 fw-semibold mb-1" style={{ letterSpacing: '-0.02em' }}>
            Admin Console
          </h1>
          <p className="admin-muted mb-0">Digital Saga · authorized access only</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small text-uppercase text-white-50 mb-2">Email</label>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small text-uppercase text-white-50 mb-2">Password</label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error ? <div className="admin-error mb-3">{error}</div> : null}
          <motion.button
            type="submit"
            className="admin-btn-primary"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
