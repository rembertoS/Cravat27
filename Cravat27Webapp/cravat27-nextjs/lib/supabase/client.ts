import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Cookie-aware browser client. Shares the auth session with the server (via the
// proxy), so writes from the admin run as the authenticated owner and satisfy RLS.
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
