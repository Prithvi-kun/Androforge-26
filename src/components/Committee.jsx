import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';
import BorderGlow from './BorderGlow';
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

export default function Committee() {
  return (
    <section id="committee" className="w-full relative z-20 py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pointer-events-auto"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-blue drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] tracking-wider mb-6">
            COMMITTEE
          </h2>
          <p className="text-cyber-silver text-lg max-w-2xl mx-auto">
            Organising Committee
          </p>
        </motion.div>

        <BorderGlow
          backgroundColor="transparent"
          borderRadius={24}
          glowColor="rgba(14, 165, 233, 0.4)"
          borderWidth={2}
          className="w-full relative pointer-events-auto"
        >
          {/* Big Box Container */}
          <div className="w-full bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            {/* 4 columns on large screens, 2 on medium, 1 on small -> 2 rows of 4 for 8 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {committeeMembers.map((member, i) => (
                <ProfileCard
                  key={i}
                  name={member.name}
                  title={member.title}
                  handle={member.handle}
                  status="Online"
                  contactText="Contact"
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
    </section>
  );
}
