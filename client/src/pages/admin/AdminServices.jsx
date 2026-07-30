import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { apiFetch, clearAdminToken, getAdminToken } from '../../lib/api';
import '../../styles/admin.css';

const initialForm = {
  icon: 'fas fa-star',
  title: '',
  description: '',
  featuresText: '',
  sort_order: 0,
  is_active: true,
};

const AdminServices = () => {
  const [, navigate] = useLocation();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const title = useMemo(
    () => (editingId ? 'Edit service' : 'Add service'),
    [editingId]
  );

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/api/admin/services');
      const data = await res.json().catch(() => []);
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          navigate('/admin/login');
          return;
        }
        setError('Could not load services.');
        return;
      }
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setError('Network error. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getAdminToken()) {
      navigate('/admin/login');
      return;
    }
    load();
  }, [navigate]);

  const logout = async () => {
    try {
      await apiFetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    clearAdminToken();
    navigate('/admin/login');
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      icon: item.icon || 'fas fa-star',
      title: item.title || '',
      description: item.description || '',
      featuresText: (item.features || []).join('\n'),
      sort_order: Number(item.sort_order || 0),
      is_active: Boolean(item.is_active),
    });
  };

  const parseFeatures = (text) =>
    text
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const endpoint = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services';
      const method = editingId ? 'PUT' : 'POST';
      const payload = {
        icon: form.icon,
        title: form.title,
        description: form.description,
        features: parseFeatures(form.featuresText),
        sort_order: Number(form.sort_order || 0),
        is_active: form.is_active,
      };
      const res = await apiFetch(endpoint, {
        method,
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.message || 'Could not save service.');
        return;
      }
      resetForm();
      await load();
    } catch {
      setError('Network error while saving.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      const res = await apiFetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setError('Could not delete service.');
        return;
      }
      await load();
    } catch {
      setError('Network error while deleting.');
    }
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
                  <h1 className="h5 fw-semibold mb-0">Services Manager</h1>
                  <span className="admin-badge">Admin</span>
                </div>
                <p className="admin-muted mb-0 small">Add, edit, remove website services</p>
              </div>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button type="button" className="admin-btn-ghost" onClick={() => navigate('/admin')}>
                Inquiries
              </button>
              <button type="button" className="admin-btn-ghost" onClick={() => navigate('/admin/portfolios')}>
                Portfolios
              </button>
              <button type="button" className="admin-btn-ghost" onClick={() => navigate('/')}>
                View site
              </button>
              <button type="button" className="admin-btn-ghost" onClick={logout}>
                Log out
              </button>
            </div>
          </header>

          <div className="admin-glass p-3 p-md-4 mb-4">
            <h2 className="h6 mb-3">{title}</h2>
            <form onSubmit={submit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
                </div>
                <div className="col-md-6">
                  <input className="admin-input" placeholder="Icon class (e.g. fas fa-search)" value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} required />
                </div>
                <div className="col-12">
                  <textarea className="admin-input" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
                </div>
                <div className="col-md-8">
                  <textarea className="admin-input" rows={4} placeholder="Features (one per line)" value={form.featuresText} onChange={(e) => setForm((p) => ({ ...p, featuresText: e.target.value }))} />
                </div>
                <div className="col-md-2">
                  <input className="admin-input" type="number" min="0" placeholder="Sort" value={form.sort_order} onChange={(e) => setForm((p) => ({ ...p, sort_order: e.target.value }))} />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <label className="admin-muted">
                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} className="me-2" />
                    Active
                  </label>
                </div>
              </div>
              {error ? <p className="admin-error mt-3 mb-0">{error}</p> : null}
              <div className="d-flex gap-2 mt-3">
                <button className="admin-btn-primary" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Update service' : 'Add service'}
                </button>
                {editingId ? (
                  <button className="admin-btn-ghost" type="button" onClick={resetForm}>
                    Cancel edit
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          <div className="admin-glass p-3 p-md-4">
            {loading ? (
              <p className="admin-muted mb-0">Loading...</p>
            ) : rows.length === 0 ? (
              <p className="admin-muted mb-0">No services yet.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Icon</th>
                      <th>Sort</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td><code>{item.icon}</code></td>
                        <td>{item.sort_order}</td>
                        <td>{item.is_active ? 'Active' : 'Hidden'}</td>
                        <td className="d-flex gap-2">
                          <button type="button" className="admin-btn-ghost" onClick={() => startEdit(item)}>Edit</button>
                          <button type="button" className="admin-btn-ghost" onClick={() => remove(item.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminServices;
