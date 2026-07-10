import { motion } from 'framer-motion';

export default function Prizes() {
  const specialAwards = [
    { title: "Best UI/UX", amount: "₹10,000", icon: "🌟" },
    { title: "Most Innovative", amount: "₹10,000", icon: "💡" },
    { title: "Best Social Impact", amount: "₹10,000", icon: "🌱" },
    { title: "Best Use of AI", amount: "₹10,000", icon: "⚡" },
    { title: "Best Freshers Team", amount: "₹10,000", icon: "🎓" }
  ];

  const perks = [
    { text: "Premium Swag Kits", icon: "🎒" },
    { text: "Certificates for All", icon: "📜" },
    { text: "Internship Opportunities", icon: "💼" },
    { text: "Sponsor Goodies", icon: "🎁" }
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="prizes" className="relative">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">REWARDS AWAIT</p>
          <h2 className="section-title text-3xl md:text-4xl">Prize Pool</h2>
        </motion.div>

        {/* Total Prize Pool Highlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="font-orbitron text-5xl md:text-6xl gradient-text font-black mb-2 animate-pulse-glow inline-block px-8 py-4 rounded-2xl border border-cyber-blue/20 bg-cyber-blue/5">
            ₹2,00,000+
          </h3>
          <p className="font-mono text-gray-400 mt-4 tracking-[0.3em] uppercase text-sm">Total Prize Pool</p>
        </motion.div>

        {/* Top 3 Prizes */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 items-center"
        >
          {/* Runner Up */}
          <motion.div variants={itemVariants} className="glass-card prize-silver p-8 text-center order-2 md:order-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/5 to-transparent pointer-events-none" />
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🥈</div>
            <h4 className="font-orbitron text-xl text-gray-300 mb-2">Runner Up</h4>
            <p className="font-mono text-3xl text-white font-bold mb-4">₹50,000</p>
            <div className="h-px bg-gray-400/30 w-full mb-4" />
            <p className="text-xs text-gray-400 font-mono">Trophy + Medals + Certs</p>
          </motion.div>

          {/* Winner */}
          <motion.div variants={itemVariants} className="glass-card prize-gold p-10 text-center order-1 md:order-2 md:transform md:scale-110 relative overflow-hidden group z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 blur-3xl rounded-full" />
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🥇</div>
            <h4 className="font-orbitron text-2xl text-amber-400 mb-2 font-bold">Winner</h4>
            <p className="font-mono text-4xl text-white font-black mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">₹75,000</p>
            <div className="h-px bg-amber-500/30 w-full mb-4" />
            <p className="text-sm text-gray-300 font-mono mb-2">Grand Trophy + Medals</p>
            <p className="text-xs text-amber-400/80 font-mono">Winners Certificate</p>
          </motion.div>

          {/* 2nd Runner Up */}
          <motion.div variants={itemVariants} className="glass-card prize-bronze p-8 text-center order-3 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700/5 to-transparent pointer-events-none" />
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🥉</div>
            <h4 className="font-orbitron text-xl text-amber-600 mb-2">2nd Runner Up</h4>
            <p className="font-mono text-3xl text-white font-bold mb-4">₹25,000</p>
            <div className="h-px bg-amber-700/30 w-full mb-4" />
            <p className="text-xs text-gray-400 font-mono">Trophy + Medals + Certs</p>
          </motion.div>
        </motion.div>

        {/* Special Awards */}
        <div className="mb-12">
          <h3 className="font-orbitron text-xl text-center text-white mb-8 border-b border-cyber-blue/20 pb-4 inline-block mx-auto w-full max-w-md">Special Awards</h3>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {specialAwards.map((award, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-subtle py-3 px-5 flex items-center gap-3 border-cyber-neon/20 hover:border-cyber-neon/50 hover:bg-cyber-blue/5 transition-all cursor-default group">
                <span className="text-xl group-hover:scale-125 transition-transform">{award.icon}</span>
                <div className="text-left">
                  <p className="font-orbitron text-xs text-gray-300">{award.title}</p>
                  <p className="font-mono text-sm text-cyber-neon font-bold">{award.amount}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Perks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {perks.map((perk, i) => (
            <div key={i} className="glass-subtle p-4 flex flex-col items-center justify-center text-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span className="text-2xl">{perk.icon}</span>
              <span className="text-xs font-mono uppercase tracking-wider">{perk.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
