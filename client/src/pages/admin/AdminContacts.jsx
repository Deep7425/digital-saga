import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiFetch, clearAdminToken, getAdminToken } from '../../lib/api';
import '../../styles/admin.css';

const formatDate = (iso) => {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const AdminContacts = () => {
  const [, navigate] = useLocation();
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getAdminToken()) {
      navigate('/admin/login');
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiFetch('/api/admin/contacts');
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            navigate('/admin/login');
            return;
          }
          setError(data.message || 'Could not load messages.');
          return;
        }
        if (!cancelled) {
          setRows(data.data || []);
          setMeta({
            total: data.total,
            current_page: data.current_page,
            last_page: data.last_page,
          });
        }
      } catch {
        if (!cancelled) setError('Network error. Is the API running?');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const logout = async () => {
    try {
      await apiFetch('/api/admin/logout', { method: 'POST' });
    } catch {
      /* ignore */
    }
    clearAdminToken();
    navigate('/admin/login');
  };

  return (
    <div className="admin-root min-vh-100">
      <div className="container py-4 py-md-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <header className="admin-topbar">
            <div className="d-flex align-items-center gap-3">
              <div className="admin-logo-mark">DS</div>
              <div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h1 className="h5 fw-semibold mb-0">Inquiries</h1>
                  <span className="admin-badge">Admin</span>
                </div>
                <p className="admin-muted mb-0 small">Contact submissions from your website</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="admin-btn-ghost" onClick={() => navigate('/admin/portfolios')}>
                Portfolios
              </button>
              <button type="button" className="admin-btn-ghost" onClick={() => navigate('/admin/services')}>
                Services
              </button>
              <button type="button" className="admin-btn-ghost" onClick={() => navigate('/')}>
                View site
              </button>
              <button type="button" className="admin-btn-ghost" onClick={logout}>
                Log out
              </button>
            </div>
          </header>

          <div className="admin-glass p-3 p-md-4">
            {loading ? (
              <p className="admin-muted mb-0 py-4 text-center">Loading…</p>
            ) : error ? (
              <p className="admin-error mb-0 py-2">{error}</p>
            ) : rows.length === 0 ? (
              <p className="admin-muted mb-0 py-4 text-center">No messages yet.</p>
            ) : (
              <>
                {meta ? (
                  <p className="admin-muted small mb-3">
                    Page {meta.current_page} of {meta.last_page} · {meta.total} total
                  </p>
                ) : null}
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Received</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((c) => (
                        <tr key={c.id}>
                          <td className="text-nowrap">{formatDate(c.created_at)}</td>
                          <td>{c.name}</td>
                          <td>
                            <a href={`mailto:${c.email}`} className="text-decoration-none" style={{ color: '#c4b5fd' }}>
                              {c.email}
                            </a>
                          </td>
                          <td>{c.phone}</td>
                          <td>{c.service || '—'}</td>
                          <td style={{ maxWidth: 320, whiteSpace: 'pre-wrap' }}>{c.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminContacts;
