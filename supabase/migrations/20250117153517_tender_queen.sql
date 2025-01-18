/*
  # Update page completion to be profile-specific

  1. Changes
    - Add profile_id column to page_completion table
    - Update RLS policies to check profile ownership
    - Add cascade delete for when profiles are deleted

  2. Security
    - Maintain RLS policies to ensure users can only access their own data
    - Add proper foreign key constraints
*/

-- First add the profile_id column
ALTER TABLE page_completion
ADD COLUMN profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE;

-- Add index for better query performance
CREATE INDEX page_completion_profile_id_idx ON page_completion(profile_id);

-- Update RLS policies to include profile check
DROP POLICY IF EXISTS "Users can read own page completion" ON page_completion;
DROP POLICY IF EXISTS "Users can insert own page completion" ON page_completion;
DROP POLICY IF EXISTS "Users can update own page completion" ON page_completion;

CREATE POLICY "Users can read own page completion"
  ON page_completion
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = page_completion.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own page completion"
  ON page_completion
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own page completion"
  ON page_completion
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = page_completion.profile_id
      AND profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );