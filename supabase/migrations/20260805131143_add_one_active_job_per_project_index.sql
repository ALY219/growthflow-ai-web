/*
# Enforce one active generation job per project

1. Changes
   - Adds a partial unique index on `generation_jobs(project_id)` that only
     includes rows with status 'pending' or 'generating'.
   - This is a database-level safety net: even if the application logic has a
     race condition, Postgres will reject the second insert for the same
     project while an active job exists.
2. Security
   - No RLS changes. This is purely a data-integrity constraint.
3. Important notes
   - The index is partial (WHERE clause) so completed/failed jobs do NOT
     block new generations — only one *active* job per project is enforced.
   - Idempotent: uses `IF NOT EXISTS`.
*/

CREATE UNIQUE INDEX IF NOT EXISTS one_active_generation_job_per_project
  ON generation_jobs (project_id)
  WHERE status IN ('pending', 'generating');
