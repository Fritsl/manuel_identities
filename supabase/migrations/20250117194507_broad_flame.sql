/*
  # Add Environment Preferences Table

  1. New Tables
    - `environment_preferences`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `workplace_socialization` (integer, 1-5)
      - `work_pace_structure` (integer, 1-5) 
      - `learning_development` (integer, 1-5)
      - `autonomy_support` (integer, 1-5)
      - `compensation_incentives` (integer, 1-5)
      - `work_life_integration` (integer, 1-5)
      - `cultural_engagement` (integer, 1-5)
      - `qualifications_credentials` (integer, 1-5)
      - `adaptability_change` (integer, 1-5)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own preferences
*/

-- Create environment_preferences table
CREATE TABLE environment_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  workplace_socialization integer NOT NULL CHECK (workplace_socialization BETWEEN 1 AND 5),
  work_pace_structure integer NOT NULL CHECK (work_pace_structure BETWEEN 1 AND 5),
  learning_development integer NOT NULL CHECK (learning_development BETWEEN 1 AND 5),
  autonomy_support integer NOT NULL CHECK (autonomy_support BETWEEN 1 AND 5),
  compensation_incentives integer NOT NULL CHECK (compensation_incentives BETWEEN 1 AND 5),
  work_life_integration integer NOT NULL CHECK (work_life_integration BETWEEN 1 AND 5),
  cultural_engagement integer NOT NULL CHECK (cultural_engagement BETWEEN 1 AND 5),
  qualifications_credentials integer NOT NULL CHECK (qualifications_credentials BETWEEN 1 AND 5),
  adaptability_change integer NOT NULL CHECK (adaptability_change BETWEEN 1 AND 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT environment_preferences_profile_id_key UNIQUE (profile_id)
);

-- Add indexes for better query performance
CREATE INDEX environment_preferences_profile_id_idx ON environment_preferences(profile_id);

-- Enable RLS
ALTER TABLE environment_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read own environment preferences"
  ON environment_preferences
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = environment_preferences.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own environment preferences"
  ON environment_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own environment preferences"
  ON environment_preferences
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = environment_preferences.profile_id
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