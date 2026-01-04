import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

const BACKEND = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:4000";

const Track = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    setError(null);
    setResult(null);
    if (!query) return setError("Enter a grievance ID to track (e.g. NX-ABC123)");
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/grievances/track/${encodeURIComponent(query)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || `Lookup failed (${res.status})`);
      } else {
        const body = await res.json();
        setResult(body.grievance);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-8">
        <GlassCard className="max-w-3xl mx-auto p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Track Your Grievance</h2>

          <p className="text-sm text-muted-foreground mb-4">Enter the grievance ID you received after submission to check its status. This lookup is public and only shows the grievance metadata.</p>

          <div className="flex gap-3 mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter grievance ID (e.g. NX-1A2B3C)"
              className="flex-1 rounded border border-app bg-app-surface px-4 py-2 text-foreground"
            />
            <Button onClick={handleLookup} className="shrink-0">{loading ? 'Looking...' : 'Lookup'}</Button>
          </div>

          {error && <div className="text-sm text-destructive mb-4">{error}</div>}

          {result ? (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">ID: <span className="text-foreground font-medium">{result.id}</span></div>
              <div className="text-sm text-muted-foreground">Title: <span className="text-foreground font-medium">{result.title}</span></div>
              <div className="text-sm text-muted-foreground">Category: <span className="text-foreground font-medium">{result.category}</span></div>
              <div className="text-sm text-muted-foreground">Status: <span className="text-foreground font-medium">{result.status}</span></div>
              {result.user_email && <div className="text-sm text-muted-foreground">Submitted by: <span className="text-foreground font-medium">{result.user_email}</span></div>}
              {result.created_at && <div className="text-sm text-muted-foreground">Created: <span className="text-foreground font-medium">{new Date(result.created_at).toLocaleString()}</span></div>}
              {result.description && (
                <div className="pt-3 border-t border-app mt-2">
                  <h4 className="text-sm font-medium text-foreground">Description</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{result.description}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No result yet. Enter an ID and click Lookup.</div>
          )}
        </GlassCard>
      </div>
    </PageLayout>
  );
};

export default Track;
