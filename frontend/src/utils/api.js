// Centralized API fetch helper
// Uses CRA dev proxy when REACT_APP_API_BASE is not set.
// Additionally, in development without a proxy, falls back to http://localhost:5000
let DEFAULT_DEV_API = '';
try {
  if (typeof window !== 'undefined') {
    const port = window.location && window.location.port;
    // If running on a non-5000 port (e.g., 3000 for CRA), assume backend on 5000
    if (port && port !== '5000') {
      DEFAULT_DEV_API = 'http://localhost:5000';
    }
  }
} catch (_) {
  // no-op for SSR or unusual envs
}

export const API_BASE = process.env.REACT_APP_API_BASE || DEFAULT_DEV_API || '';

export function apiUrl(path) {
  if (!path.startsWith('/')) return `${API_BASE}/${path}`;
  return `${API_BASE}${path}`;
}

export async function apiFetch(path, options = {}) {
  const url = apiUrl(path);
  const opts = { ...options };

  // If body is a plain object and Content-Type not set, send JSON
  if (opts.body && typeof opts.body === 'object' && !(opts.body instanceof FormData)) {
    opts.headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, opts);
  return res;
}

export async function apiJson(path, options = {}) {
  const res = await apiFetch(path, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
