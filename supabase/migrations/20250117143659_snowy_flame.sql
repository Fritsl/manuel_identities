/*
  # Profile Headlines Schema Update
  
  1. Changes
    - Remove headline column from profiles table
    - Add cascade delete for profile_headlines
    - Update indexes and RLS policies
  
  2. Security
    - Ensure proper cascade deletion
    - Update RLS policies for better security
*/

-- Remove headline column from profiles if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'headline'
  ) THEN
    ALTER TABLE profiles DROP COLUMN headline;
  END IF;
END $$;

-- Add cascade delete for profile_headlines
ALTER TABLE profile_headlines
DROP CONSTRAINT IF EXISTS profile_headlines_profile_id_fkey,
ADD CONSTRAINT profile_headlines_profile_id_fkey
  FOREIGN KEY (profile_id)
  REFERENCES profiles(id)
  ON DELETE CASCADE;

-- Recreate indexes for better performance
DROP INDEX IF EXISTS profile_headlines_profile_id_idx;
DROP INDEX IF EXISTS profile_headlines_user_id_idx;
CREATE INDEX profile_headlines_profile_id_idx ON profile_headlines(profile_id);
CREATE INDEX profile_headlines_user_id_idx ON profile_headlines(user_id);

-- Update RLS policies for better security
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profile_headlines' AND policyname = 'Users can read own headlines'
  ) THEN
    DROP POLICY "Users can read own headlines" ON profile_headlines;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profile_headlines' AND policyname = 'Users can insert own headlines'
  ) THEN
    DROP POLICY "Users can insert own headlines" ON profile_headlines;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profile_headlines' AND policyname = 'Users can update own headlines'
  ) THEN
    DROP POLICY "Users can update own headlines" ON profile_headlines;
  END IF;
END $$;

CREATE POLICY "Users can read own headlines"
  ON profile_headlines
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_headlines.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own headlines"
  ON profile_headlines
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
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
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );