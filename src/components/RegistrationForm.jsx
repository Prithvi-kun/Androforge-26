import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitRegistration } from '../lib/supabase'

const TRACKS = ['AI/ML', 'Web3', 'FinTech', 'HealthTech', 'Open Innovation']
const EMPTY_FORM = { name: '', email: '', phone: '', college: '', team_name: '', track: '' }

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Name is required.'
  else if (fields.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!fields.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Enter a valid email address.'

  if (!fields.phone.trim()) errors.phone = 'Phone number is required.'
  else if (!/^\+?[0-9\s\-]{7,15}$/.test(fields.phone)) errors.phone = 'Enter a valid phone number.'

  if (!fields.college.trim()) errors.college = 'College name is required.'

  if (!fields.team_name.trim()) errors.team_name = 'Team name is required.'
  else if (fields.team_name.trim().length < 3) errors.team_name = 'Team name must be at least 3 characters.'

  if (!fields.track) errors.track = 'Select a track.'

  return errors
}

function Field({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-mono tracking-widest text-cyber-blue uppercase">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-cyber-pink font-mono mt-0.5"
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass = (hasError) =>
  `w-full bg-cyber-darker/60 border ${
    hasError ? 'border-cyber-pink' : 'border-cyber-blue/30 focus:border-cyber-neon shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]'
  } rounded-lg px-4 py-3 text-sm text-white font-mono placeholder-gray-600
   outline-none transition-all duration-300 focus:ring-1 focus:ring-cyber-neon/30 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)]`

export default function RegistrationForm() {
  const [fields, setFields] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(fields)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    setServerError('')

    const { error } = await submitRegistration({
      name: fields.name.trim(),
      email: fields.email.trim().toLowerCase(),
      phone: fields.phone.trim(),
      college: fields.college.trim(),
      team_name: fields.team_name.trim(),
      track: fields.track,
    })

    if (error) {
      if (error.code === '23505') setServerError('This email is already registered. Each participant can register once.')
      else setServerError(error.message || 'Registration failed. Try again.')
      setStatus('error')
    } else {
      setStatus('success')
      setFields(EMPTY_FORM)
      setErrors({})
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card border-cyber-neon/50 p-10 text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-cyber-neon/5 pointer-events-none" />
        <div className="text-6xl animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">🌀</div>
        <h3 className="text-3xl font-orbitron font-bold text-cyber-neon tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          TIMELINE SECURED
        </h3>
        <p className="text-gray-300 font-mono text-sm max-w-md mx-auto">
          You are locked into Androforge 2026. Keep an eye on your inbox for further coordinates.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-cyber-outline mt-4"
        >
          Register Another Member
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      noValidate
      className="space-y-6 glass-card p-6 md:p-8 relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/5 rounded-bl-full pointer-events-none" />
      
      <div className="mb-6 border-b border-cyber-blue/20 pb-4">
        <h2 className="font-orbitron text-2xl font-bold text-white tracking-wide">
          Enter the <span className="text-cyber-neon neon-text-subtle">Forge</span>
        </h2>
        <p className="text-xs text-gray-400 font-mono mt-2 uppercase tracking-widest">
          No Registration Fee · All fields required
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Full Name" id="name" error={errors.name}>
          <input id="name" name="name" type="text" placeholder="Ada Lovelace" value={fields.name} onChange={handleChange} className={inputClass(!!errors.name)} />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <input id="email" name="email" type="email" placeholder="ada@college.edu" value={fields.email} onChange={handleChange} className={inputClass(!!errors.email)} />
        </Field>
        <Field label="Phone" id="phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={fields.phone} onChange={handleChange} className={inputClass(!!errors.phone)} />
        </Field>
        <Field label="College / University" id="college" error={errors.college}>
          <input id="college" name="college" type="text" placeholder="Anna University" value={fields.college} onChange={handleChange} className={inputClass(!!errors.college)} />
        </Field>
        <Field label="Team Name" id="team_name" error={errors.team_name}>
          <input id="team_name" name="team_name" type="text" placeholder="NeuralNomads" value={fields.team_name} onChange={handleChange} className={inputClass(!!errors.team_name)} />
        </Field>
        <Field label="Primary Track" id="track" error={errors.track}>
          <select id="track" name="track" value={fields.track} onChange={handleChange} className={inputClass(!!errors.track) + ' appearance-none cursor-pointer'}>
            <option value="" disabled>Select your track</option>
            {TRACKS.map((t) => <option key={t} value={t} className="bg-cyber-dark text-white">{t}</option>)}
          </select>
        </Field>
      </div>

      <AnimatePresence>
        {status === 'error' && serverError && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-lg border border-cyber-pink/40 bg-cyber-pink/10 px-4 py-3 text-sm font-mono text-cyber-pink shadow-[0_0_10px_rgba(236,72,153,0.1)]">
            ⚠ {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      <button type="submit" disabled={status === 'submitting'} className={`w-full ${status === 'submitting' ? 'bg-cyber-dark border border-cyber-blue/30 text-cyber-blue cursor-not-allowed py-4 rounded-lg font-orbitron font-bold tracking-widest' : 'btn-cyber py-4 text-sm'}`}>
        {status === 'submitting' ? 'TRANSMITTING...' : 'INITIALIZE SEQUENCE'}
      </button>
    </motion.form>
  )
}
