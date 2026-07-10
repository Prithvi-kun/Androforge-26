import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import BorderGlow from '../components/BorderGlow';
import Galaxy from '../components/Galaxy';
import FloatingNav from '../components/FloatingNav';
import Footer from '../components/Footer';
import logoImg from '@assets/Logo-removebg-preview.png';

const committeeMembers = [
  { name: 'Alice Smith', title: 'Lead Organizer', handle: 'alicesmith' },
  { name: 'Bob Johnson', title: 'Technical Lead', handle: 'bobjohnson' },
  { name: 'Carol White', title: 'Design Head', handle: 'carolwhite' },
  { name: 'David Brown', title: 'Sponsorship', handle: 'davidbrown' },
  { name: 'Eve Davis', title: 'Marketing', handle: 'evedavis' },
  { name: 'Frank Miller', title: 'Logistics', handle: 'frankmiller' },
  { name: 'Grace Wilson', title: 'Community', handle: 'gracewilson' },
  { name: 'Henry Moore', title: 'Operations', handle: 'henrymoore' },
];

export default function Contact() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyNumber = (number) => {
    navigator.clipboard.writeText(number);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Galaxy 
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      <main className="w-full min-h-screen relative z-10 flex flex-col items-center pt-32 pb-32">
        <div className="max-w-[1400px] w-full mx-auto px-6">
          <div className="w-full flex justify-start mb-8 pointer-events-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-cyber-silver hover:text-white transition-colors group"
            >
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 bg-black/40 backdrop-blur-md transition-all">
                <ChevronLeft size={20} />
              </div>
              <span className="font-orbitron font-medium tracking-wider text-sm">GO BACK</span>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 pointer-events-auto"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-blue drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] tracking-wider mb-6">
              COMMITTEE
            </h2>
          </motion.div>

          <BorderGlow
            backgroundColor="transparent"
            borderRadius={24}
            glowColor="rgba(14, 165, 233, 0.4)"
            borderWidth={2}
            className="w-full relative pointer-events-auto"
          >
            <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-[100px] shadow-[0_0_50px_rgba(14,165,233,0.15)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {committeeMembers.map((member, i) => (
                  <ProfileCard
                    key={i}
                    name={member.name}
                    title={member.title}
                    handle={member.handle}
                    status="+91 99999 99999"
                    contactText="Contact"
                    onContactClick={() => handleCopyNumber("+91 99999 99999")}
                    avatarUrl={`https://i.pravatar.cc/300?u=${member.handle}`}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    behindGlowColor="rgba(14, 165, 233, 0.4)"
                    iconUrl={logoImg}
                    behindGlowEnabled={true}
                    innerGradient="linear-gradient(145deg,#0e152e 0%,#0ea5e944 100%)"
                  />
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-28 left-1/2 z-[100] px-6 py-3 bg-cyber-blue/20 border border-cyber-blue/50 text-white font-orbitron text-sm rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.5)] pointer-events-none"
          >
            Number copied!
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingNav />
    </>
  );
}
