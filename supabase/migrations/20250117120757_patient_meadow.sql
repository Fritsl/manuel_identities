/*
  # Add congratulations state tracking

  1. New Tables
    - `congratulations_state`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `shown_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `congratulations_state` table
    - Add policies for authenticated users to manage their own records
*/

CREATE TABLE IF NOT EXISTS congratulations_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  shown_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT congratulations_state_user_id_key UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE congratulations_state ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own congratulations state"
  ON congratulations_state
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own congratulations state"
  ON congratulations_state
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own congratulations state"
  ON congratulations_state
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);