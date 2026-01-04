/*
  Register Page — part of the NeuroX grievance platform UI.
  Implements sign-up flow and preserves theme tokens for consistency.
*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassCard } from '@/components/ui/GlassCard';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(email, password, role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    }
  };

  return (
    <PageLayout>
      <section className="py-20 bg-app-background min-h-[60vh]">
        <div className="container mx-auto px-6">
          <GlassCard className="max-w-md mx-auto p-8 bg-app-surface border border-app shadow-sm">
            <h2 className="text-3xl font-bold text-foreground mb-2">Create account</h2>
            <p className="text-sm text-muted-foreground mb-6">Create your NeuroX account to submit and track grievances.</p>

            <form onSubmit={onSubmit} className="space-y-4">
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <Input placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />

              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <Input type="password" placeholder="Choose a strong password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <div>
                <label className="text-xs font-medium text-muted-foreground">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full rounded border border-app bg-app-surface px-3 py-2 text-foreground">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}

              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium">
                Create account
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{' '}
              <Link to="/login" className="text-foreground font-medium hover:underline">Sign in</Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default Register;
