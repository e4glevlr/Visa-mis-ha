import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseServiceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. Admin operations may fail.')
}

// Create a Supabase client with the SERVICE ROLE KEY.
// This client bypasses Row Level Security (RLS) and should ONLY be used in server-side contexts (API routes, Server Components).
// NEVER expose this client or the key to the browser.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})
