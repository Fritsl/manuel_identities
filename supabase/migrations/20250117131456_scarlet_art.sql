-- Drop existing table
DROP TABLE IF EXISTS environment_preferences;

-- Recreate environment_preferences table with all required columns
CREATE TABLE environment_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  workplace_socialization integer NOT NULL CHECK (workplace_socialization BETWEEN 1 AND 5),
  work_pace_structure integer NOT NULL CHECK (work_pace_structure BETWEEN 1 AND 5),
  learning_development integer NOT NULL CHECK (learning_development BETWEEN 1 AND 5),
  autonomy_support integer NOT NULL CHECK (autonomy_support BETWEEN 1 AND 5),
  compensation_incentives integer NOT NULL CHECK (compensation_incentives BETWEEN 1 AND 5),
  work_life_integration integer NOT NULL CHECK (work_life_integration BETWEEN 1 AND 5),
  cultural_engagement integer NOT NULL CHECK (cultural_engagement BETWEEN 1 AND 5),
  qualifications_credentials integer NOT NULL CHECK (qualifications_credentials BETWEEN 1 AND 5),
  adaptability_change integer NOT NULL CHECK (adaptability_change BETWEEN 1 AND 5),
  additional_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT environment_preferences_profile_id_key UNIQUE (profile_id)
);

-- Enable RLS
ALTER TABLE environment_preferences ENABLE ROW LEVEL SECURITY;

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