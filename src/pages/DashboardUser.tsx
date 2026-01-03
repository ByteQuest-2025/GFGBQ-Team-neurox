import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const DashboardUser = () => {
  const { authFetch, user } = useAuth();
  const [grievances, setGrievances] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('General');

  const load = async () => {
    const res = await authFetch('/api/grievances');
    const data = await res.json();
    setGrievances(data.grievances || []);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    await authFetch('/api/grievances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: desc, category })
    });
    setTitle(''); setDesc(''); setCategory('General');
    load();
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-4">Submit Grievance</h2>
        <form onSubmit={submit} className="space-y-4 mb-8">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="block mt-1 w-full rounded border border-border px-3 py-2">
            <option>General</option>
            <option>Service</option>
            <option>Policy</option>
            <option>Other</option>
          </select>
          <Textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <Button type="submit">Submit</Button>
        </form>

        <h3 className="text-xl font-semibold mb-3">Your grievances</h3>
        <div className="space-y-3">
          {grievances.map((g) => (
            <div key={g.id} className="p-4 border rounded bg-app-surface">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-muted-foreground">{new Date(g.created_at).toLocaleString()}</div>
                  <div className="font-medium">{g.title}</div>
                  <div className="text-sm text-muted-foreground">{g.category}</div>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded text-sm ${g.status === 'Resolved' ? 'bg-green-200 text-green-800' : g.status === 'In Review' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {g.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardUser;
