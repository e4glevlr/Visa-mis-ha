-- Migration to rename columns from snake_case to camelCase
-- Run this in your Supabase SQL Editor

-- Rename columns in applications table
ALTER TABLE public.applications 
  RENAME COLUMN full_name TO "fullName";

ALTER TABLE public.applications 
  RENAME COLUMN id_number TO "idNumber";

ALTER TABLE public.applications 
  RENAME COLUMN passport_photo_path TO "passportPhotoPath";

ALTER TABLE public.applications 
  RENAME COLUMN id_photo_path TO "idPhotoPath";
