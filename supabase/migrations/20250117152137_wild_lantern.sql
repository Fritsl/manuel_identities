/*
  # Update profiles table schema
  
  1. Changes
    - Add profile_number SERIAL column
    - Remove name column (since we use headline instead)
    - Add NOT NULL constraint to user_id
    - Add index on profile_number
  
  2. Security
    - Maintain existing RLS policies
    - Update constraints for data integrity
*/

-- Add profile_number column
ALTER TABLE profiles 
ADD COLUMN profile_number SERIAL;

-- Create index on profile_number
CREATE INDEX profiles_number_idx ON profiles(profile_number);

-- Remove name column since we use headline instead
ALTER TABLE profiles 
DROP COLUMN name;

-- Add NOT NULL constraint to user_id if not already present
ALTER TABLE profiles 
ALTER COLUMN user_id SET NOT NULL;