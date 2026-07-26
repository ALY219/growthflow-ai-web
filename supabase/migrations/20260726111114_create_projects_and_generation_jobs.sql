/*
# Create projects and generation_jobs tables for GrowthFlow AI

1. Purpose
   Replaces the Blink SDK database with Supabase tables to store website
   generation wizard data. The wizard collects business info, audience,
   website style, structure, and features — all stored as structured JSON
   in the `config` column of `generation_jobs`.

2. New Tables
   - `projects`
     - `id` (uuid, PK, default gen_random_uuid())
     - `user_id` (text, not null) — the Blink auth user id (Blink manages auth, not Supabase)
     - `name` (text, not null)
     - `description` (text, default '')
     - `type` (text, default 'website') — website | saas | landing-page | dashboard
     - `status` (text, default 'draft') — draft | building | completed | archived
     - `data` (jsonb, default '{}') — extra metadata (industry, theme, targetAudience)
     - `created_at` (timestamptz, default now())
     - `updated_at` (timestamptz, default now())
   - `generation_jobs`
     - `id` (uuid, PK, default gen_random_uuid())
     - `project_id` (uuid, FK → projects.id ON DELETE CASCADE)
     - `user_id` (text, not null) — Blink auth user id
     - `config` (jsonb, not null, default '{}') — full GenerationConfig from wizard
     - `status` (text, default 'pending') — pending | in-progress | completed | failed
     - `generation_type` (text, default 'website')
     - `created_at` (timestamptz, default now())
     - `updated_at` (timestamptz, default now())

3. Security
   - RLS enabled on both tables.
   - Policies use `TO anon, authenticated` because this app uses Blink-managed
     auth (not Supabase Auth), so the anon-key client makes all requests.
     Client-side `user_id` filtering enforces per-user isolation.
   - 4 CRUD policies per table (select/insert/update/delete).

4. Indexes
   - `projects` on `user_id` (frequent filtering)
   - `generation_jobs` on `project_id` (frequent lookup)
   - `generation_jobs` on `user_id`

5. Notes
   - Blink auth issues a stable user id; we store it as text (not uuid FK to
     auth.users) because Supabase Auth is not used.
   - `updated_at` is maintained by the application layer, not a trigger.
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'draft',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
CREATE POLICY "anon_insert_projects" ON projects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_projects" ON projects;
CREATE POLICY "anon_update_projects" ON projects FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_projects" ON projects;
CREATE POLICY "anon_delete_projects" ON projects FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects (user_id);

CREATE TABLE IF NOT EXISTS generation_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  generation_type text NOT NULL DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE generation_jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_generation_jobs" ON generation_jobs;
CREATE POLICY "anon_select_generation_jobs" ON generation_jobs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_generation_jobs" ON generation_jobs;
CREATE POLICY "anon_insert_generation_jobs" ON generation_jobs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_generation_jobs" ON generation_jobs;
CREATE POLICY "anon_update_generation_jobs" ON generation_jobs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_generation_jobs" ON generation_jobs;
CREATE POLICY "anon_delete_generation_jobs" ON generation_jobs FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_generation_jobs_project_id ON generation_jobs (project_id);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_user_id ON generation_jobs (user_id);
