/*
  # Add unique constraint to profile_headlines

  1. Changes
    - Add unique constraint to user_id column to ensure one headline per user
*/

-- Add unique constraint to user_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'profile_headlines_user_id_key'
  ) THEN
    ALTER TABLE profile_headlines ADD CONSTRAINT profile_headlines_user_id_key UNIQUE (user_id);
  END IF;
END $$;