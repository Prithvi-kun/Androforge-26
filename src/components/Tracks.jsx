import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tracks() {
  const [expandedTrack, setExpandedTrack] = useState(null);

  const tracks = [
    {
      id: "aiml",
      name: "AI / ML",
      icon: "🤖",
      sponsor: true,
      desc: "Build intelligent systems powered by machine learning, computer vision, and natural language processing.",
      problems: [
        "Smart City Traffic Optimization via predictive modeling",
        "AI-Powered Healthcare Diagnostics and early detection",
        "Generative AI solutions for personalized education"
      ]
    },
    {
      id: "web3",
      name: "Web3 & Blockchain",
      icon: "⛓️",
      sponsor: false,
      desc: "Decentralized apps, blockchain solutions, and the future of trustless systems and smart contracts.",
      problems: [
        "Decentralized Identity Verification systems",
        "Tokenized Carbon Credit Marketplace",
        "Transparent supply chain tracking for pharmaceuticals"
      ]
    },
    {
      id: "fintech",
      name: "FinTech",
      icon: "💳",
      sponsor: false,
      desc: "Reimagine financial services with innovative payment, lending, security, and investment solutions.",
      problems: [
        "Financial Literacy Gamification for rural demographics",
        "Cross-Border Micro-Payment Platform with minimal fees",
        "Fraud detection for peer-to-peer transactions"
      ]
    },
    {
      id: "healthtech",
      name: "HealthTech",
      icon: "🏥",
      sponsor: false,
      desc: "Technology-driven solutions for healthcare accessibility, diagnostics, patient care, and biotech.",
      problems: [
        "Rural Telemedicine Platform with low-bandwidth support",
        "Mental Health Early Detection System via behavioral analysis",
        "Wearable integration for chronic disease management"
      ]
    },
    {
      id: "open",
      name: "Open Innovation",
      icon: "🌐",
      sponsor: false,
      desc: "No boundaries. Build anything that makes the world better. If you have an idea, this is your track.",
      problems: [
        "Sustainability Challenge: Reduce urban carbon footprint",
        "Accessibility Tools for people with disabilities",
        "Your own moonshot idea that defies categorization"
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="tracks" className="relative">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">CHOOSE YOUR PATH</p>
          <h2 className="section-title text-3xl md:text-4xl">Hackathon Tracks</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tracks.map((track) => (
            <motion.div 
              key={track.id} 
              variants={itemVariants} 
              className="glass-card relative overflow-hidden flex flex-col h-full border-t border-t-cyber-neon/40 hover:border-t-cyber-neon"
            >
              {track.sponsor && (
                <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-orbitron uppercase tracking-wider flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                  <span>🏅</span> Sponsor Challenge
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-4xl mb-4 bg-cyber-darker w-16 h-16 flex items-center justify-center rounded-xl border border-cyber-blue/20">
                  {track.icon}
                </div>
                <h3 className="font-orbitron text-xl text-white mb-3">{track.name}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1">
                  {track.desc}
                </p>

                <div className="mt-auto">
                  <button 
                    onClick={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
                    className="w-full flex items-center justify-between py-2 border-t border-cyber-blue/20 text-sm font-mono text-cyber-blue hover:text-cyber-neon transition-colors"
                  >
                    <span>Problem Statements</span>
                    <span className={`transform transition-transform ${expandedTrack === track.id ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  
                  <AnimatePresence>
                    {expandedTrack === track.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="pt-3 pb-1 pl-5 list-disc space-y-2 text-xs text-gray-400 marker:text-cyber-blue">
                          {track.problems.map((prob, i) => (
                            <li key={i}>{prob}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
