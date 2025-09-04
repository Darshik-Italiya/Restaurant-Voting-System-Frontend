// Small helpers for token + user info in localStorage

const TOKEN_KEY = 'rv_token';
const USER_KEY = 'rv_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user || null));
}
export function getUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
}
export function clearUser() { localStorage.removeItem(USER_KEY); }
