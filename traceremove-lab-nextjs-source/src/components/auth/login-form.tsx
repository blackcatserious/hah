"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ next = "/dashboard" }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured yet.");
      setLoading(false);
      return;
    }
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (authError) setError(authError.message);
    else setMessage("Check your email for the secure sign-in link.");
    setLoading(false);
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input id="email" className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@organisation.com" />
      </div>
      <p className="form-help">Passwordless sign-in. The link is valid for one session.</p>
      {error && <p className="form-error">{error}</p>}
      {message && <p className="form-success">{message}</p>}
      <button className="button primary" type="submit" disabled={loading}>{loading ? "Sending…" : "Send secure link"}</button>
    </form>
  );
}
