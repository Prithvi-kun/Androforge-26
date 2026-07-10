// src/hooks/useRegistrationStats.js
import { useState, useEffect, useRef } from 'react'
import { supabase, fetchStats, hasSupabase } from '../lib/supabase'

const INITIAL_STATE = {
  participantCount: 0,
  teamCount: 0,
  collegeCount: 0,
  loading: true,
  error: null,
}

export function useRegistrationStats() {
  const [stats, setStats] = useState(INITIAL_STATE)
  const teamSet = useRef(new Set())
  const collegeSet = useRef(new Set())

  useEffect(() => {
    let channel;
    let mockInterval;

    async function bootstrap() {
      try {
        const snapshot = await fetchStats()

        if (hasSupabase) {
          const { data: rows } = await supabase
            .from('registrations')
            .select('college, team_name')

          if (rows) {
            rows.forEach((r) => {
              teamSet.current.add(r.team_name)
              collegeSet.current.add(r.college)
            })
          }
        }

        setStats({ ...snapshot, loading: false, error: null })
      } catch (err) {
        setStats((prev) => ({ ...prev, loading: false, error: err.message }))
        return
      }

      if (hasSupabase) {
        channel = supabase
          .channel('registrations-live')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'registrations' },
            (payload) => {
              const { team_name, college } = payload.new
              const isNewTeam = !teamSet.current.has(team_name)
              const isNewCollege = !collegeSet.current.has(college)

              teamSet.current.add(team_name)
              collegeSet.current.add(college)

              setStats((prev) => ({
                ...prev,
                participantCount: prev.participantCount + 1,
                teamCount: isNewTeam ? prev.teamCount + 1 : prev.teamCount,
                collegeCount: isNewCollege ? prev.collegeCount + 1 : prev.collegeCount,
              }))
            }
          )
          .subscribe()
      } else {
        // Mock live updates for demonstration without Supabase
        mockInterval = setInterval(() => {
          if (Math.random() > 0.7) {
            setStats(prev => ({
              ...prev,
              participantCount: prev.participantCount + 1,
              teamCount: Math.random() > 0.5 ? prev.teamCount + 1 : prev.teamCount,
              collegeCount: Math.random() > 0.8 ? prev.collegeCount + 1 : prev.collegeCount
            }));
          }
        }, 5000);
      }
    }

    bootstrap()

    return () => {
      if (channel && hasSupabase) supabase.removeChannel(channel)
      if (mockInterval) clearInterval(mockInterval);
    }
  }, [])

  return stats
}
