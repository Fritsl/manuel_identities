/*
  # Add has_shown_congratulations column

  1. Changes
    - Add has_shown_congratulations boolean column to profile_completion table
    - Set default value to false
    - Add NOT NULL constraint
  
  2. Notes
    - This column tracks whether the congratulations screen has been shown to the user
    - Used to ensure the congratulations screen is only shown once when profile reaches 100%
*/

-- Add has_shown_congratulations column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profile_completion' 
    AND column_name = 'has_shown_congratulations'
  ) THEN
    ALTER TABLE profile_completion 
      ADD COLUMN has_shown_congratulations boolean NOT NULL DEFAULT false;
  END IF;
END $$;