"use client";

import { ChangeEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function DocumentUploader({ projectId }: { projectId: string }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true); setError(""); setMessage("");
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase is not configured.");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Sign in again.");
      const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
      const path = `${user.id}/${projectId}/${crypto.randomUUID()}-${safe}`;
      const { error: uploadError } = await supabase.storage.from("project-documents").upload(path, file, { upsert: false });
      if (uploadError) throw uploadError;
      const response = await fetch("/api/documents", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ projectId, path, name: file.name, mimeType: file.type, size: file.size }) });
      if (!response.ok) throw new Error((await response.json()).error || "Metadata could not be saved.");
      setMessage("Document uploaded. Refresh the page to see it in the evidence register.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Upload failed.");
    } finally {
      setLoading(false); event.target.value = "";
    }
  }

  return (
    <div className="form">
      <div className="field"><label htmlFor="document">Evidence document (PDF, DOCX, TXT)</label><input id="document" className="input" type="file" accept=".pdf,.doc,.docx,.txt,.md" onChange={upload} disabled={loading} /></div>
      <p className="form-help">Private storage is enforced by Supabase row-level and storage policies.</p>
      {message && <p className="form-success">{message}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
