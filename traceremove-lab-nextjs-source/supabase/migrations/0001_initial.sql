-- Traceremove Research / AI Responsibility Laboratory
-- Run in a new Supabase project through SQL Editor or Supabase CLI.

create extension if not exists pgcrypto;
create extension if not exists vector;

create type public.user_role as enum ('member', 'admin');
create type public.project_status as enum ('draft', 'assessed', 'archived');
create type public.publication_kind as enum ('research_essay', 'working_paper', 'manuscript', 'published');
create type public.assessment_status as enum ('queued', 'running', 'completed', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  organisation text,
  role public.user_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  organisation text,
  system_type text not null,
  description text not null,
  decision_context text not null,
  affected_people text not null,
  status public.project_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  mime_type text,
  size_bytes bigint,
  storage_path text not null unique,
  status text not null default 'uploaded',
  extracted_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.document_chunks (
  id bigserial primary key,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  document_id uuid not null references public.documents(id) on delete cascade,
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create index document_chunks_embedding_idx on public.document_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index document_chunks_project_idx on public.document_chunks(project_id);

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  modules text[] not null default '{}',
  input_snapshot jsonb not null,
  result jsonb,
  overall_risk text,
  score integer check (score is null or (score >= 0 and score <= 100)),
  status public.assessment_status not null default 'queued',
  model text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text not null unique,
  kind public.publication_kind not null,
  status_label text not null,
  year text not null,
  abstract text not null,
  keywords text[] not null default '{}',
  url text,
  pdf_url text,
  is_public boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  provider text not null default 'paddle',
  provider_customer_id text,
  provider_subscription_id text unique,
  plan text not null default 'free',
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigserial primary key,
  owner_id uuid references public.profiles(id) on delete set null,
  project_id uuid references public.projects(id) on delete cascade,
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1)),
    case when lower(coalesce(new.email, '')) = lower(coalesce(current_setting('app.admin_email', true), '')) then 'admin'::public.user_role else 'member'::public.user_role end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger projects_updated_at before update on public.projects for each row execute procedure public.set_updated_at();
create trigger documents_updated_at before update on public.documents for each row execute procedure public.set_updated_at();
create trigger assessments_updated_at before update on public.assessments for each row execute procedure public.set_updated_at();
create trigger publications_updated_at before update on public.publications for each row execute procedure public.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions for each row execute procedure public.set_updated_at();

create or replace function public.match_document_chunks(
  query_embedding vector(1536),
  match_project_id uuid,
  match_count int default 8
)
returns table (
  id bigint,
  document_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable security invoker as $$
  select
    dc.id,
    dc.document_id,
    dc.content,
    dc.metadata,
    1 - (dc.embedding <=> query_embedding) as similarity
  from public.document_chunks dc
  where dc.project_id = match_project_id
    and dc.owner_id = auth.uid()
    and dc.embedding is not null
  order by dc.embedding <=> query_embedding
  limit greatest(match_count, 1);
$$;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.documents enable row level security;
alter table public.document_chunks enable row level security;
alter table public.assessments enable row level security;
alter table public.publications enable row level security;
alter table public.subscriptions enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles_select_own" on public.profiles for select using (id = auth.uid());
create policy "profiles_update_own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "projects_own_all" on public.projects for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "documents_own_all" on public.documents for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "chunks_own_all" on public.document_chunks for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "assessments_own_all" on public.assessments for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "subscriptions_select_own" on public.subscriptions for select using (user_id = auth.uid());
create policy "audit_logs_select_own" on public.audit_logs for select using (owner_id = auth.uid());

create policy "publications_public_read" on public.publications for select using (is_public = true or author_id = auth.uid());
create policy "publications_admin_insert" on public.publications for insert with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "publications_admin_update" on public.publications for update using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
) with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "publications_admin_delete" on public.publications for delete using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-documents',
  'project-documents',
  false,
  25000000,
  array['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','text/plain','text/markdown']
)
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "storage_project_documents_select" on storage.objects for select using (
  bucket_id = 'project-documents' and (storage.foldername(name))[1] = auth.uid()::text
);
create policy "storage_project_documents_insert" on storage.objects for insert with check (
  bucket_id = 'project-documents' and (storage.foldername(name))[1] = auth.uid()::text
);
create policy "storage_project_documents_update" on storage.objects for update using (
  bucket_id = 'project-documents' and (storage.foldername(name))[1] = auth.uid()::text
) with check (
  bucket_id = 'project-documents' and (storage.foldername(name))[1] = auth.uid()::text
);
create policy "storage_project_documents_delete" on storage.objects for delete using (
  bucket_id = 'project-documents' and (storage.foldername(name))[1] = auth.uid()::text
);

-- After your first login, promote the founder account manually:
-- update public.profiles set role = 'admin' where email = 'YOUR_EMAIL';
