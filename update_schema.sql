-- 1. If your table is named "license" (singular), rename it to "licenses" so it's standard
ALTER TABLE IF EXISTS "license" RENAME TO "licenses";

-- 2. Add the missing columns for the Admin Dashboard to work
ALTER TABLE "licenses" ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true;
ALTER TABLE "licenses" ADD COLUMN IF NOT EXISTS "plan" text DEFAULT 'lifetime';
