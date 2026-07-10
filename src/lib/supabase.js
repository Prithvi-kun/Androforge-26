// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const hasSupabase = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project-id.supabase.co')

export const supabase = hasSupabase 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: { params: { eventsPerSecond: 10 } },
    })
  : null

if (!hasSupabase) {
  console.warn('[Androforge] Supabase credentials missing or invalid. Using mock data fallback.')
}

export async function submitRegistration(registration) {
  if (!hasSupabase) {
    // Mock successful submission delay
    await new Promise(r => setTimeout(r, 1500))
    // Mock unique constraint error for a specific email
    if (registration.email === 'test@error.com') {
      return { data: null, error: { code: '23505', message: 'Email already exists' } }
    }
    return { data: [registration], error: null }
  }

  const { data, error } = await supabase
    .from('registrations')
    .insert([registration])
    .select()

  return { data, error }
}

export async function fetchStats() {
  if (!hasSupabase) {
    // Return mock initial stats
    return {
      participantCount: 524,
      teamCount: 142,
      collegeCount: 68,
    }
  }

  const [{ count: participantCount }, teamsResult] = await Promise.all([
    supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('registrations')
      .select('college, team_name'),
  ])

  const rows = teamsResult.data ?? []
  const teamCount = new Set(rows.map((r) => r.team_name)).size
  const collegeCount = new Set(rows.map((r) => r.college)).size

  return {
    participantCount: participantCount ?? 0,
    teamCount,
    collegeCount,
  }
}

export { hasSupabase }
