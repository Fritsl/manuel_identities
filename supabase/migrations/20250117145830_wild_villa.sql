/*
  # Clean up unused database elements

  1. Changes
    - Drop unused environment_descriptions table
    - Drop existing policies that depend on user_id column
    - Remove redundant user_id column from profile_headlines
    - Recreate policies without user_id dependency

  2. Security
    - Maintain security through profile relationships
    - Update policies to work with profile_id only

  Note: This is a safe migration that maintains data integrity
*/

-- Drop unused environment_descriptions table
DROP TABLE IF EXISTS environment_descriptions CASCADE;

-- First drop the policies that depend on the user_id column
DROP POLICY IF EXISTS "Users can insert own headlines" ON profile_headlines;
DROP POLICY IF EXISTS "Users can update own headlines" ON profile_headlines;

-- Now we can safely drop the user_id column
ALTER TABLE profile_headlines DROP COLUMN IF EXISTS user_id;

-- Recreate policies without user_id dependency
CREATE POLICY "Users can insert own headlines"
  ON profile_headlines
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own headlines"
  ON profile_headlines
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_headlines.profile_id
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