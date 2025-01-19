/*
  # Profile Completion Status Table

  1. New Tables
    - `profile_completion`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `page_id` (text)
      - `is_completed` (boolean)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profile_completion` table
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS profile_completion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  page_id text NOT NULL,
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint for user_id and page_id combination
ALTER TABLE profile_completion 
  ADD CONSTRAINT profile_completion_user_page_unique 
  UNIQUE (user_id, page_id);

-- Enable RLS
ALTER TABLE profile_completion ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own completion status"
  ON profile_completion
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completion status"
  ON profile_completion
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own completion status"
  ON profile_completion
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);