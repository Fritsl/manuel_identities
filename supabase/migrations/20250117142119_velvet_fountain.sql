/*
  # Fix environment preferences

  1. Changes
    - Drop the automatic trigger that was causing conflicts
    - Add proper indexes for performance
    - Update RLS policies for better security

  2. Security
    - Maintain existing RLS policies with improved checks
    - Ensure proper user access control
*/

-- Drop the trigger and function
DROP TRIGGER IF EXISTS create_environment_preferences ON profiles;
DROP FUNCTION IF EXISTS initialize_environment_preferences();

-- Recreate indexes for better performance
DROP INDEX IF EXISTS environment_preferences_profile_id_idx;
DROP INDEX IF EXISTS environment_preferences_user_id_idx;
CREATE INDEX environment_preferences_profile_id_idx ON environment_preferences(profile_id);
CREATE INDEX environment_preferences_user_id_idx ON environment_preferences(user_id);

-- Update RLS policies for better security
DROP POLICY IF EXISTS "Users can read own environment preferences" ON environment_preferences;
DROP POLICY IF EXISTS "Users can insert own environment preferences" ON environment_preferences;
DROP POLICY IF EXISTS "Users can update own environment preferences" ON environment_preferences;

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
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );