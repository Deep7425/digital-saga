import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { apiFetch, clearAdminToken, getAdminToken, uploadPortfolioImage } from '../../lib/api';
import '../../styles/admin.css';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE_MB = 5;

const initialForm = {
  client_name: '',
  industry: '',
  result: '',
  description: '',
  image: '',
  accent_color: '#7c3aed',
  sort_order: 0,
  is_active: true,
};

const AdminPortfolios = () => {
  const [, navigate] = useLocation();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const fileInputRef = useRef(null);

  const title = useMemo(
    () => (editingId ? 'Edit portfolio item' : 'Add portfolio item'),
    [editingId]
  );

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/api/admin/portfolios');
      const data = await res.json().catch(() => []);
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          navigate('/admin/login');
          return;
        }
        setError('Could not load portfolios.');
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
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImageFile = async (file) => {
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageError('Please choose a JPG, PNG, WebP, or GIF image.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setImageError(`Image must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`);
      return;
    }

    setUploadingImage(true);
    setImageError('');

    try {
      const res = await uploadPortfolioImage(file);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          navigate('/admin/login');
          return;
        }
        const message = data?.message || data?.errors?.image?.[0] || 'Could not upload image.';
        setImageError(message);
        return;
      }

      setForm((prev) => ({ ...prev, image: data.path || '' }));
    } catch {
      setImageError('Network error while uploading image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageFile(file);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadImageFile(file);
    }
  };

  const clearImage = () => {
    setForm((prev) => ({ ...prev, image: '' }));
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setImageError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setForm({
      client_name: item.client_name || '',
      industry: item.industry || '',
      result: item.result || '',
      description: item.description || '',
      image: item.image || '',
      accent_color: item.accent_color || '#7c3aed',
      sort_order: Number(item.sort_order || 0),
      is_active: Boolean(item.is_active),
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const endpoint = editingId ? `/api/admin/portfolios/${editingId}` : '/api/admin/portfolios';
      const method = editingId ? 'PUT' : 'POST';
      const payload = {
        ...form,
        sort_order: Number(form.sort_order || 0),
      };
      const res = await apiFetch(endpoint, {
        method,
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.message || 'Could not save portfolio.');
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
    if (!window.confirm('Delete this portfolio item?')) return;
    try {
      const res = await apiFetch(`/api/admin/portfolios/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setError('Could not delete portfolio.');
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
                  <h1 className="h5 fw-semibold mb-0">Portfolio Manager</h1>
                  <span className="admin-badge">Admin</span>
                </div>
                <p className="admin-muted mb-0 small">Add and edit homepage portfolio projects</p>
              </div>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button type="button" className="admin-btn-ghost" onClick={() => navigate('/admin')}>
                Inquiries
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

          <div className="admin-glass p-3 p-md-4 mb-4">
            <h2 className="h6 mb-3">{title}</h2>
            <form onSubmit={submit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input className="admin-input" placeholder="Client name" value={form.client_name} onChange={(e) => setForm((p) => ({ ...p, client_name: e.target.value }))} required />
                </div>
                <div className="col-md-6">
                  <input className="admin-input" placeholder="Industry / category" value={form.industry} onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))} required />
                </div>
                <div className="col-md-6">
                  <input className="admin-input" placeholder="Result line" value={form.result} onChange={(e) => setForm((p) => ({ ...p, result: e.target.value }))} required />
                </div>
                <div className="col-md-6">
                  <div
                    className={`admin-image-upload${form.image ? ' has-image' : ''}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleImageDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(',')}
                      className="admin-image-upload-input"
                      onChange={handleImageSelect}
                      disabled={uploadingImage}
                    />

                    {form.image ? (
                      <div className="admin-image-preview">
                        <img src={form.image} alt="Portfolio preview" />
                        <div className="admin-image-preview-actions">
                          <button
                            type="button"
                            className="admin-btn-ghost"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                          >
                            {uploadingImage ? 'Uploading...' : 'Change image'}
                          </button>
                          <button
                            type="button"
                            className="admin-btn-ghost"
                            onClick={clearImage}
                            disabled={uploadingImage}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="admin-image-upload-empty">
                        <div className="admin-image-upload-icon" aria-hidden="true">
                          <i className="bi bi-image" />
                        </div>
                        <p className="admin-image-upload-title mb-1">
                          {uploadingImage ? 'Uploading image...' : 'Portfolio image'}
                        </p>
                        <p className="admin-muted mb-3 small">
                          Drag and drop or browse (JPG, PNG, WebP, GIF — max {MAX_IMAGE_SIZE_MB} MB)
                        </p>
                        <button
                          type="button"
                          className="admin-btn-ghost"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                        >
                          {uploadingImage ? 'Uploading...' : 'Browse image'}
                        </button>
                      </div>
                    )}
                  </div>
                  {imageError ? <p className="admin-error mt-2 mb-0">{imageError}</p> : null}
                </div>
                <div className="col-md-8">
                  <textarea className="admin-input" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
                </div>
                <div className="col-md-2">
                  <input className="admin-input" type="number" min="0" placeholder="Sort" value={form.sort_order} onChange={(e) => setForm((p) => ({ ...p, sort_order: e.target.value }))} />
                </div>
                <div className="col-md-2">
                  <input className="admin-input" type="text" placeholder="#7c3aed" value={form.accent_color} onChange={(e) => setForm((p) => ({ ...p, accent_color: e.target.value }))} />
                </div>
                <div className="col-12 d-flex align-items-center gap-3">
                  <label className="admin-muted">
                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} className="me-2" />
                    Active on homepage
                  </label>
                </div>
              </div>
              {error ? <p className="admin-error mt-3 mb-0">{error}</p> : null}
              <div className="d-flex gap-2 mt-3">
                <button className="admin-btn-primary" type="submit" disabled={saving || uploadingImage}>
                  {saving ? 'Saving...' : editingId ? 'Update portfolio' : 'Add portfolio'}
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
              <p className="admin-muted mb-0">No portfolio items yet.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Industry</th>
                      <th>Sort</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item) => (
                      <tr key={item.id}>
                        <td>{item.client_name}</td>
                        <td>{item.industry}</td>
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

export default AdminPortfolios;
