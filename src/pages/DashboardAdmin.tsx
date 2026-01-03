import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';

const DashboardAdmin = () => {
  const { authFetch } = useAuth();
  const [grievances, setGrievances] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  const load = async () => {
    const res = await authFetch('/api/grievances');
    const data = await res.json();
    setGrievances(data.grievances || []);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await authFetch(`/api/grievances/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    load();
  };

  const visible = grievances.filter(g => filter === 'All' ? true : g.status === filter);

  return (
    <ProtectedRoute adminOnly>
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-4">Admin - All Grievances</h2>
        <div className="flex gap-3 mb-6">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded border border-border px-3 py-2">
            <option>All</option>
            <option>Submitted</option>
            <option>In Review</option>
            <option>Resolved</option>
          </select>
          <Button onClick={load}>Refresh</Button>
        </div>

        <div className="space-y-3">
          {visible.map((g) => (
            <div key={g.id} className="p-4 border rounded bg-app-surface flex justify-between items-center">
              <div>
                <div className="text-sm text-muted-foreground">{g.user_email} • {new Date(g.created_at).toLocaleString()}</div>
                <div className="font-medium">{g.title}</div>
                <div className="text-sm text-muted-foreground">{g.category}</div>
              </div>
              <div className="flex items-center gap-3">
                <select value={g.status} onChange={(e) => updateStatus(g.id, e.target.value)} className="rounded border border-border px-3 py-2">
                  <option>Submitted</option>
                  <option>In Review</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardAdmin;