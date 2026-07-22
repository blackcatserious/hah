export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function hasSupabaseEnv(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;
  return Boolean(url && key);
}

export function hasAiEnv(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function hasPaddleEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN &&
      process.env.NEXT_PUBLIC_PADDLE_PRICE_RESEARCHER,
  );
}
