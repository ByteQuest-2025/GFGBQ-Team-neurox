import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = { id: number; email: string; role: string } | null;

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem('nx_token');
    const u = localStorage.getItem('nx_user');
    if (t && u) {
      setToken(t);
      try { setUser(JSON.parse(u)); } catch { setUser(null); }
    }
    setLoading(false);
  }, []);

  const save = (t: string, u: any) => {
    localStorage.setItem('nx_token', t);
    localStorage.setItem('nx_user', JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const register = async (email: string, password: string, role?: string) => {
    const res = await fetch(`${BACKEND}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Register failed');
    save(data.token, data.user);
    return data.user;
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${BACKEND}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    save(data.token, data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('nx_token');
    localStorage.removeItem('nx_user');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  const authFetch = (input: RequestInfo, init: RequestInit = {}) => {
    const headers = init.headers ? new Headers(init.headers as any) : new Headers();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, { ...init, headers });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
