import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import LiveStats from '../components/LiveStats';
import { useTransition } from '../components/TemporalTransition';

export default function Register() {
  const { triggerTransition } = useTransition();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    triggerTransition(() => {
      navigate('/');
    });
  };

  return (
    <main className="min-h-screen py-12 px-4 relative z-10 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <a 
            href="/"
            onClick={handleBack}
            className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-cyber-neon transition-colors group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            Return to Main Timeline
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <RegistrationForm />
          </div>

          {/* Sidebar / Stats */}
          <div className="lg:col-span-4 order-1 lg:order-2 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6 border-t-2 border-t-cyber-neon text-center lg:text-left"
            >
              <h3 className="font-orbitron text-xl text-white mb-2">Event Briefing</h3>
              <ul className="space-y-4 mt-4 font-mono text-sm text-gray-300">
                <li className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                  <span className="text-cyber-blue">Date</span>
                  <span className="text-white">Sep 30 - Oct 2, 2026</span>
                </li>
                <li className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                  <span className="text-cyber-blue">Format</span>
                  <span className="text-white">48hr In-Person Hackathon</span>
                </li>
                <li className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                  <span className="text-cyber-blue">Team</span>
                  <span className="text-white">2 to 4 Members</span>
                </li>
                <li className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                  <span className="text-cyber-blue">Fee</span>
                  <span className="text-green-400">Zero (Free)</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-card p-4">
                <LiveStats />
              </div>
            </motion.div>
            
          </div>
        </div>

      </div>
    </main>
  );
}
