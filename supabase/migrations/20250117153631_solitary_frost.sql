/*
  # Fix page completion unique constraint

  1. Changes
    - Add unique constraint for profile_id and page_id combination
    - Drop old user_id based constraint
    - Remove user_id column since we use profile_id

  2. Security
    - Maintain RLS policies
    - Ensure data integrity with proper constraints
*/

-- First drop the old constraint if it exists
ALTER TABLE page_completion 
DROP CONSTRAINT IF EXISTS page_completion_user_page_key;

-- Add new unique constraint for profile_id and page_id
ALTER TABLE page_completion 
ADD CONSTRAINT page_completion_profile_page_key 
UNIQUE (profile_id, page_id);

-- Remove user_id column since we use profile_id to link to profiles
ALTER TABLE page_completion 
DROP COLUMN IF EXISTS user_id;