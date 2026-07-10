import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useRegistrationStats } from '../hooks/useRegistrationStats'

function AnimatedCount({ value }) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())
  const prevRef = useRef(0)

  useEffect(() => {
    spring.set(value)
    prevRef.current = value
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}

function StatCard({ value, label, loading, accent = 'cyan' }) {
  const accentMap = {
    cyan: { number: 'text-cyan-400', glow: 'shadow-[0_0_15px_rgba(34,211,238,0.2)]', border: 'border-cyan-500/30', pulse: 'bg-cyan-400' },
    violet: { number: 'text-purple-400', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]', border: 'border-purple-500/30', pulse: 'bg-purple-400' },
    amber: { number: 'text-amber-400', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.2)]', border: 'border-amber-500/30', pulse: 'bg-amber-400' },
  }
  const c = accentMap[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative flex flex-col items-center justify-center gap-1
        rounded-xl border ${c.border} bg-cyber-dark/60 backdrop-blur-md
        px-6 py-5 ${c.glow} flex-1 min-w-[120px] overflow-hidden`}
    >
      <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl opacity-20 ${c.pulse}`} />
      
      <span className="absolute top-3 right-3 flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.pulse} opacity-60`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${c.pulse}`} />
      </span>

      <span className={`text-5xl font-orbitron font-bold tabular-nums ${c.number} leading-none mb-1 drop-shadow-[0_0_8px_currentColor]`}>
        {loading ? <span className="opacity-40">—</span> : <AnimatedCount value={value} />}
      </span>
      <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
        {label}
      </span>
    </motion.div>
  )
}

export default function LiveStats() {
  const { participantCount, teamCount, collegeCount, loading, error } = useRegistrationStats()

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6 max-w-3xl mx-auto">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyber-neon/50" />
        <span className="text-xs font-mono text-cyber-neon tracking-widest uppercase px-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-neon animate-pulse" />
          Live Metrics
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-cyber-neon/50" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
        <StatCard value={participantCount} label="Hackers" loading={loading} accent="cyan" />
        <StatCard value={teamCount} label="Teams" loading={loading} accent="violet" />
        <StatCard value={collegeCount} label="Colleges" loading={loading} accent="amber" />
      </div>

      {error && (
        <p className="mt-4 text-center text-xs font-mono text-cyber-pink">
          ⚠ Real-time unavailable · Stats may be delayed
        </p>
      )}
    </section>
  )
}
