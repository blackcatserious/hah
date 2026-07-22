"use client";

import { useState } from "react";
import { initializePaddle } from "@paddle/paddle-js";
import { createClient } from "@/lib/supabase/client";

export function PaddleCheckout({ priceId, label }: { priceId?: string; label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openCheckout() {
    setLoading(true);
    setError("");
    try {
      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      if (!token || !priceId) throw new Error("Billing is not configured yet.");
      const supabase = createClient();
      const user = supabase ? (await supabase.auth.getUser()).data.user : null;
      if (!user) {
        window.location.href = `/login?next=${encodeURIComponent("/pricing")}`;
        return;
      }
      const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production" ? "production" : "sandbox";
      const paddle = await initializePaddle({ token, environment });
      if (!paddle) throw new Error("Paddle could not be initialized.");
      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        ...(user.email ? { customer: { email: user.email } } : {}),
        customData: { user_id: user.id },
        settings: { displayMode: "overlay", theme: "dark", locale: "en" },
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button className="button primary" type="button" onClick={openCheckout} disabled={loading}>
        {loading ? "Opening…" : label}
      </button>
      {error && <p className="form-error" style={{marginTop:10}}>{error}</p>}
    </div>
  );
}
