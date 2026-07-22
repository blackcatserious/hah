export const metadata = { title: "Platform setup" };

export default function SetupPage() {
  return (
    <section>
      <span className="overline">Platform configuration</span>
      <h1>Connect the dynamic services.</h1>
      <div className="panel setup-card">
        <h2>Required before accounts and assessments work</h2>
        <ol>
          <li>Create a Supabase project and run <code>supabase/migrations/0001_initial.sql</code>.</li>
          <li>Add the Supabase URL, publishable key, and service role key to Netlify environment variables.</li>
          <li>Add an OpenAI API key for generated assessments.</li>
          <li>Add Paddle client token, price IDs, and webhook secret to activate billing.</li>
          <li>Redeploy the same Netlify project.</li>
        </ol>
      </div>
    </section>
  );
}
