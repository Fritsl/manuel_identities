/*
  # Add multi-profile support

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `headline` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes
    - Add `profile_id` to `page_completion` table
    - Add `profile_id` to `profile_headlines` table
    - Update constraints and indexes
    - Update RLS policies

  3. Security
    - Enable RLS on new tables
    - Add appropriate policies for CRUD operations
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  headline text,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX profiles_user_id_idx ON profiles(user_id);
CREATE INDEX profiles_is_active_idx ON profiles(is_active);

-- Add profile_id to existing tables
ALTER TABLE page_completion 
  ADD COLUMN profile_id uuid REFERENCES profiles,
  DROP CONSTRAINT page_completion_user_page_key,
  ADD CONSTRAINT page_completion_profile_page_key UNIQUE (profile_id, page_id);

ALTER TABLE profile_headlines
  ADD COLUMN profile_id uuid REFERENCES profiles,
  DROP CONSTRAINT profile_headlines_user_id_key,
  ADD CONSTRAINT profile_headlines_profile_id_key UNIQUE (profile_id);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can read own profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profiles"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update page_completion policies
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

-- Update profile_headlines policies
DROP POLICY IF EXISTS "Users can read own headlines" ON profile_headlines;
DROP POLICY IF EXISTS "Users can insert own headlines" ON profile_headlines;
DROP POLICY IF EXISTS "Users can update own headlines" ON profile_headlines;

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

-- Ensure only one active profile per user
CREATE UNIQUE INDEX profiles_user_active_idx ON profiles (user_id) WHERE is_active = true;