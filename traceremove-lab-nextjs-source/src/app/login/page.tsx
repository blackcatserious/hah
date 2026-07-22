import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const params = await searchParams;
  return (
    <section className="auth-wrap">
      <span className="overline">Private workspace</span>
      <h1>Sign in to the AI Responsibility Laboratory.</h1>
      <p className="hero-lead">Create projects, upload evidence, run assessments, export reports, and manage research records.</p>
      <div className="panel auth-card"><LoginForm next={params.next || "/dashboard"} /></div>
    </section>
  );
}
