/*
  # Create profile headlines table
  
  1. New Tables
    - `profile_headlines`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `headline` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own headlines
*/

CREATE TABLE IF NOT EXISTS profile_headlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  headline text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profile_headlines ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own headlines
CREATE POLICY "Users can read own headlines"
  ON profile_headlines
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own headlines
CREATE POLICY "Users can insert own headlines"
  ON profile_headlines
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own headlines
CREATE POLICY "Users can update own headlines"
  ON profile_headlines
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);