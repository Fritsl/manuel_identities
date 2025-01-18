-- Drop environment_preferences table and all its dependencies
DROP TABLE IF EXISTS environment_preferences CASCADE;

-- Drop indexes if they exist
DROP INDEX IF EXISTS environment_preferences_profile_id_idx;
DROP INDEX IF EXISTS environment_preferences_user_id_idx;