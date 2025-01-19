/*
  # Fix profile completion schema

  1. Changes
    - Drop existing profile_completion table
    - Create new profile_completion table with proper structure
    - Add unique constraint on user_id
    - Enable RLS and add policies
*/

-- Drop existing table and recreate with proper structure
DROP TABLE IF EXISTS profile_completion;

CREATE TABLE profile_completion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  has_shown_congratulations boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT profile_completion_user_id_key UNIQUE (user_id)
);

-- Create separate table for page completion status
CREATE TABLE page_completion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  page_id text NOT NULL,
  is_completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT page_completion_user_page_key UNIQUE (user_id, page_id)
);

-- Enable RLS
ALTER TABLE profile_completion ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_completion ENABLE ROW LEVEL SECURITY;

-- Policies for profile_completion
CREATE POLICY "Users can read own profile completion"
  ON profile_completion
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile completion"
  ON profile_completion
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile completion"
  ON profile_completion
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for page_completion
CREATE POLICY "Users can read own page completion"
  ON page_completion
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own page completion"
  ON page_completion
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own page completion"
  ON page_completion
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);