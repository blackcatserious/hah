import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function verifySignature(rawBody: string, header: string, secret: string): boolean {
  const values = Object.fromEntries(header.split(";").map((part) => part.split("=")).filter((pair) => pair.length === 2));
  const timestamp = values.ts;
  const signature = values.h1;
  if (!timestamp || !signature) return false;
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;
  const digest = crypto.createHmac("sha256", secret).update(`${timestamp}:${rawBody}`).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(request: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  const header = request.headers.get("paddle-signature") || "";
  const rawBody = await request.text();
  if (!secret || !verifySignature(rawBody, header, secret)) return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  const event = JSON.parse(rawBody);
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Database admin client is not configured." }, { status: 503 });
  const data = event.data || {};
  const userId = data.custom_data?.user_id || data.customData?.user_id;
  if (!userId) return NextResponse.json({ ok: true, ignored: "No user mapping." });
  const priceId = data.items?.[0]?.price?.id || data.items?.[0]?.price_id || null;
  const plan = priceId === process.env.NEXT_PUBLIC_PADDLE_PRICE_TEAM ? "team" : priceId === process.env.NEXT_PUBLIC_PADDLE_PRICE_PROFESSIONAL ? "professional" : "researcher";
  if (["subscription.created", "subscription.updated", "subscription.activated", "subscription.canceled", "subscription.paused"].includes(event.event_type)) {
    await admin.from("subscriptions").upsert({
      user_id: userId,
      provider: "paddle",
      provider_customer_id: data.customer_id || null,
      provider_subscription_id: data.id,
      plan,
      status: data.status || "active",
      current_period_end: data.current_billing_period?.ends_at || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
  }
  return NextResponse.json({ ok: true });
}
