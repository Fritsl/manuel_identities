-- Remove additional_notes column from environment_preferences
ALTER TABLE environment_preferences DROP COLUMN IF EXISTS additional_notes;