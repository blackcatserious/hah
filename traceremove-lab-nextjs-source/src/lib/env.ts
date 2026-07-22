export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function hasSupabaseEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
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
