/*
# Fix RLS Policies: Enforce Ownership Checks on projects and generation_jobs

## Problem
The `projects` and `generation_jobs` tables had RLS policies with always-true
USING/WITH CHECK clauses for INSERT, UPDATE, and DELETE operations. This meant
any client (anon or authenticated) could insert, update, or delete any row in
these tables, completely bypassing row-level security.

## Changes
1. **projects table** — replaced the always-true INSERT/UPDATE/DELETE policies
   with ownership-scoped policies that check `user_id = auth.uid()::text`.
   The SELECT policy is also tightened to enforce ownership (only your own rows).
2. **generation_jobs table** — same treatment. Since generation_jobs has a
   `user_id` column, ownership is checked directly against it.

## Security
- All policies now scope to `TO authenticated` only (the app has sign-in).
- Ownership is enforced via `user_id = auth.uid()::text` (user_id is text, not uuid).
- SELECT: only rows where `user_id = auth.uid()::text`
- INSERT: only rows where `user_id = auth.uid()::text` (WITH CHECK)
- UPDATE: only own rows (USING + WITH CHECK)
- DELETE: only own rows (USING)
*/

-- ── projects ──
DROP POLICY IF EXISTS "anon_select_projects" ON projects;
DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
DROP POLICY IF EXISTS "anon_update_projects" ON projects;
DROP POLICY IF EXISTS "anon_delete_projects" ON projects;

CREATE POLICY "select_own_projects" ON projects
  FOR SELECT TO authenticated
  USING (user_id = auth.uid()::text);

CREATE POLICY "insert_own_projects" ON projects
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "update_own_projects" ON projects
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "delete_own_projects" ON projects
  FOR DELETE TO authenticated
  USING (user_id = auth.uid()::text);

-- ── generation_jobs ──
DROP POLICY IF EXISTS "anon_select_generation_jobs" ON generation_jobs;
DROP POLICY IF EXISTS "anon_insert_generation_jobs" ON generation_jobs;
DROP POLICY IF EXISTS "anon_update_generation_jobs" ON generation_jobs;
DROP POLICY IF EXISTS "anon_delete_generation_jobs" ON generation_jobs;

CREATE POLICY "select_own_generation_jobs" ON generation_jobs
  FOR SELECT TO authenticated
  USING (user_id = auth.uid()::text);

CREATE POLICY "insert_own_generation_jobs" ON generation_jobs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "update_own_generation_jobs" ON generation_jobs
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "delete_own_generation_jobs" ON generation_jobs
  FOR DELETE TO authenticated
  USING (user_id = auth.uid()::text);
