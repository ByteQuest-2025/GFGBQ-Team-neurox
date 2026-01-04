/*
  Login Page — part of the NeuroX grievance platform UI.
  This file implements the sign-in screen and uses the centralized
  theme tokens (bg-app-surface, text-foreground, etc.) so the page
  matches the rest of the site. Comments and labels are aligned
  with the original NeuroX site semantics.
*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassCard } from '@/components/ui/GlassCard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <PageLayout>
      <section className="py-20 bg-app-background min-h-[60vh]">
        <div className="container mx-auto px-6">
          <GlassCard className="max-w-md mx-auto p-8 bg-app-surface border border-app shadow-sm">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
            <p className="text-sm text-muted-foreground mb-6">Sign in to manage and track your grievances securely.</p>

            <form onSubmit={onSubmit} className="space-y-4">
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <Input placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />

              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />

              {error && <div className="text-sm text-destructive">{error}</div>}

              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium">
                Sign in
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">New to NeuroX?</span>{' '}
              <Link to="/register" className="text-foreground font-medium hover:underline">Create an account</Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default Login;
