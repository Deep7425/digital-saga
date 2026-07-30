const TOKEN_KEY = 'ds_admin_token';

/** Base URL without trailing slash, or '' to use same-origin `/api` (Vite proxy in dev). */
export function getApiBase() {
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv && String(fromEnv).trim()) {
    return String(fromEnv).replace(/\/$/, '');
  }
  return '';
}

export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  const base = getApiBase();
  return base ? `${base}${p}` : p;
}

export function getAdminToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch(path, options = {}) {
  const { skipAuth, ...rest } = options;
  const headers = new Headers(rest.headers || {});
  const token = skipAuth ? null : getAdminToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (options.body && typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const res = await fetch(apiUrl(path), { ...rest, headers });

  if (res.status === 401 || res.status === 403) {
    clearAdminToken();
  }

  return res;
}

export async function uploadPortfolioImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const headers = new Headers();
  const token = getAdminToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Accept', 'application/json');

  const res = await fetch(apiUrl('/api/admin/portfolios/upload-image'), {
    method: 'POST',
    headers,
    body: formData,
  });

  if (res.status === 401 || res.status === 403) {
    clearAdminToken();
  }

  return res;
}
