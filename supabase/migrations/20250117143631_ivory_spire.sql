/*
  # Profile Headlines Schema Update
  
  1. Changes
    - Create profile_headlines table if not exists
    - Add indexes for better query performance
    - Set up RLS policies with proper checks
  
  2. Security
    - Enable RLS
    - Create policies for read/write access
*/

-- Drop existing policies if they exist
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

-- Create profile_headlines table
CREATE TABLE IF NOT EXISTS profile_headlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  headline text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT profile_headlines_profile_id_key UNIQUE (profile_id)
);

-- Add indexes for better performance
DROP INDEX IF EXISTS profile_headlines_profile_id_idx;
DROP INDEX IF EXISTS profile_headlines_user_id_idx;
CREATE INDEX profile_headlines_profile_id_idx ON profile_headlines(profile_id);
CREATE INDEX profile_headlines_user_id_idx ON profile_headlines(user_id);

-- Enable RLS
ALTER TABLE profile_headlines ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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