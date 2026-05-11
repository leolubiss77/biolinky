-- Migration: Add avatar_url to pages table
-- Description: Store profile picture URL for each bio page
-- Created: 2026-05-11

-- Add avatar_url column to pages table
ALTER TABLE pages 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN pages.avatar_url IS 'URL to user profile picture stored in Supabase Storage';

-- Create index for faster queries (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_pages_avatar_url ON pages(avatar_url);
