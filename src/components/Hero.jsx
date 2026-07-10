import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import { useTransition } from './TemporalTransition';

export default function Hero() {
  const { triggerTransition } = useTransition();
  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    e.preventDefault();
    triggerTransition(() => {
      navigate('/register');
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      <div className="section-container relative z-10 flex flex-col items-center justify-center text-center w-full">
        
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle mb-6 text-cyber-blue"
        >
          48 HOURS · CHENNAI · SEPTEMBER 2026
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-orbitron text-6xl sm:text-7xl md:text-8xl font-black mb-4 tracking-tighter"
        >
          <span className="text-white">ANDRO</span>
          <span className="text-cyber-neon neon-text-subtle animate-glitch inline-block">FORGE</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-grotesk text-gray-400 text-lg md:text-xl max-w-2xl mb-2"
        >
          Build across timelines. The hackathon where code bends causality.
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="gradient-text font-orbitron text-sm md:text-base tracking-widest uppercase mb-12"
        >
          Temporal Cybernetics Edition
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <CountdownTimer />
        </motion.div>

        {/* Prize Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="glass-subtle px-6 py-2 rounded-full border-cyber-neon/30 shadow-[0_0_20px_rgba(34,211,238,0.15)] mb-10"
        >
          <span className="font-mono text-cyber-neon font-bold">₹2,00,000+</span>
          <span className="text-gray-300 font-grotesk ml-2">in Prizes</span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="/register"
            onClick={handleRegisterClick}
            className="btn-cyber text-center py-4 px-8"
          >
            REGISTER NOW
          </a>
          <a
            href="#timeline"
            className="btn-cyber-outline text-center py-4 px-8"
          >
            EXPLORE TIMELINE
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="font-mono text-[10px] text-gray-500 tracking-widest mb-2 uppercase">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-cyber-blue/30 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-cyber-neon rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
