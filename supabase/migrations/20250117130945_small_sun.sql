/*
  # Add Environment Preferences Tables

  1. New Tables
    - `environment_preferences`
      - Stores numeric values for environment preferences
      - One record per profile
      - References profiles table
    
    - `environment_descriptions`
      - Stores text descriptions for selected preferences
      - One record per profile
      - References profiles table

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create environment_preferences table
CREATE TABLE environment_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  workplaceSocialization integer NOT NULL CHECK (workplaceSocialization BETWEEN 1 AND 5),
  workPaceStructure integer NOT NULL CHECK (workPaceStructure BETWEEN 1 AND 5),
  learningDevelopment integer NOT NULL CHECK (learningDevelopment BETWEEN 1 AND 5),
  autonomySupport integer NOT NULL CHECK (autonomySupport BETWEEN 1 AND 5),
  compensationIncentives integer NOT NULL CHECK (compensationIncentives BETWEEN 1 AND 5),
  workLifeIntegration integer NOT NULL CHECK (workLifeIntegration BETWEEN 1 AND 5),
  culturalEngagement integer NOT NULL CHECK (culturalEngagement BETWEEN 1 AND 5),
  qualificationsCredentials integer NOT NULL CHECK (qualificationsCredentials BETWEEN 1 AND 5),
  adaptabilityChange integer NOT NULL CHECK (adaptabilityChange BETWEEN 1 AND 5),
  additionalNotes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT environment_preferences_profile_id_key UNIQUE (profile_id)
);

-- Create environment_descriptions table
CREATE TABLE environment_descriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  descriptions jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT environment_descriptions_profile_id_key UNIQUE (profile_id)
);

-- Enable RLS
ALTER TABLE environment_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE environment_descriptions ENABLE ROW LEVEL SECURITY;

-- Policies for environment_preferences
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
    auth.uid() = user_id AND
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
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Policies for environment_descriptions
CREATE POLICY "Users can read own environment descriptions"
  ON environment_descriptions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = environment_descriptions.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own environment descriptions"
  ON environment_descriptions
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

CREATE POLICY "Users can update own environment descriptions"
  ON environment_descriptions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = environment_descriptions.profile_id
      AND profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );