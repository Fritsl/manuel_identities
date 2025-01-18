-- Create environment_preferences table with proper schema
CREATE TABLE IF NOT EXISTS environment_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  workplace_socialization integer NOT NULL DEFAULT 3 CHECK (workplace_socialization BETWEEN 1 AND 5),
  work_pace_structure integer NOT NULL DEFAULT 3 CHECK (work_pace_structure BETWEEN 1 AND 5),
  learning_development integer NOT NULL DEFAULT 3 CHECK (learning_development BETWEEN 1 AND 5),
  autonomy_support integer NOT NULL DEFAULT 3 CHECK (autonomy_support BETWEEN 1 AND 5),
  compensation_incentives integer NOT NULL DEFAULT 3 CHECK (compensation_incentives BETWEEN 1 AND 5),
  work_life_integration integer NOT NULL DEFAULT 3 CHECK (work_life_integration BETWEEN 1 AND 5),
  cultural_engagement integer NOT NULL DEFAULT 3 CHECK (cultural_engagement BETWEEN 1 AND 5),
  qualifications_credentials integer NOT NULL DEFAULT 3 CHECK (qualifications_credentials BETWEEN 1 AND 5),
  adaptability_change integer NOT NULL DEFAULT 3 CHECK (adaptability_change BETWEEN 1 AND 5),
  additional_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT environment_preferences_profile_id_key UNIQUE (profile_id)
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS environment_preferences_profile_id_idx ON environment_preferences(profile_id);
CREATE INDEX IF NOT EXISTS environment_preferences_user_id_idx ON environment_preferences(user_id);

-- Enable RLS
ALTER TABLE environment_preferences ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own environment preferences" ON environment_preferences;
DROP POLICY IF EXISTS "Users can insert own environment preferences" ON environment_preferences;
DROP POLICY IF EXISTS "Users can update own environment preferences" ON environment_preferences;

-- Create policies with proper checks
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

-- Create function to initialize environment preferences
CREATE OR REPLACE FUNCTION initialize_environment_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO environment_preferences (profile_id, user_id)
  VALUES (NEW.id, NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create environment preferences when a profile is created
DROP TRIGGER IF EXISTS create_environment_preferences ON profiles;
CREATE TRIGGER create_environment_preferences
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION initialize_environment_preferences();