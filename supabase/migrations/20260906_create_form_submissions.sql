-- ==============================================================================
-- Migration: Create form_submissions table for Volunteer, CSR, and Contact Forms
-- Date: 2026-09-06
-- ==============================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('contact', 'volunteer', 'csr')),
    status VARCHAR(50) NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'reviewed', 'contacted', 'archived')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    thematic_focus TEXT,
    budget_range TEXT,
    subject TEXT,
    message TEXT,
    skills TEXT,
    availability TEXT,
    admin_notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Performance indexes
CREATE INDEX IF NOT EXISTS idx_form_submissions_type_status ON public.form_submissions (type, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions (created_at DESC);

-- 3. Row Level Security (RLS)
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public / anon users to submit form data
CREATE POLICY "Allow public form submission insert" 
ON public.form_submissions 
FOR INSERT 
TO anon, authenticated, service_role 
WITH CHECK (true);

-- Allow authenticated users (Admins) to read submissions
CREATE POLICY "Allow authenticated read on form submissions" 
ON public.form_submissions 
FOR SELECT 
TO authenticated, service_role 
USING (true);

-- Allow authenticated users (Admins) to update submission status and notes
CREATE POLICY "Allow authenticated update on form submissions" 
ON public.form_submissions 
FOR UPDATE 
TO authenticated, service_role 
USING (true)
WITH CHECK (true);

-- Allow authenticated users (Admins) to delete submissions
CREATE POLICY "Allow authenticated delete on form submissions" 
ON public.form_submissions 
FOR DELETE 
TO authenticated, service_role 
USING (true);
