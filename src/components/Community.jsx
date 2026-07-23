import { motion } from 'framer-motion';

export default function Community() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="community" className="relative pb-24">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">JOIN THE MOVEMENT</p>
          <h2 className="section-title text-3xl md:text-4xl">Community</h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12"
        >
          {/* WhatsApp */}
          <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col items-center text-center border-t-2 border-t-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">💬</div>
            <h3 className="font-orbitron text-xl text-green-400 mb-3">Join our WhatsApp</h3>
            <p className="text-sm text-gray-400 mb-8 flex-1">
              Get real-time updates, announcements, and connect with fellow hackers before the event.
            </p>
            <a href="https://chat.whatsapp.com/" target="_blank" rel="noreferrer" className="w-full py-3 px-4 rounded bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500 hover:text-white transition-all font-mono text-sm uppercase tracking-wider font-bold">
              Join Group →
            </a>
          </motion.div>

          {/* Instagram */}
          <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col items-center text-center border-t-2 border-t-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] group md:transform md:-translate-y-4">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📸</div>
            <h3 className="font-orbitron text-xl text-pink-400 mb-3">Follow on Instagram</h3>
            <p className="text-sm text-gray-400 mb-8 flex-1">
              Behind-the-scenes content, highlights, giveaways, and exclusive hackathon moments.
            </p>
            <a href="https://instagram.com/androforge" target="_blank" rel="noreferrer" className="w-full py-3 px-4 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 hover:bg-pink-500 hover:text-white transition-all font-mono text-sm uppercase tracking-wider font-bold">
              Follow Us →
            </a>
          </motion.div>

          {/* LinkedIn */}
          <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col items-center text-center border-t-2 border-t-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">💼</div>
            <h3 className="font-orbitron text-xl text-blue-400 mb-3">Connect on LinkedIn</h3>
            <p className="text-sm text-gray-400 mb-8 flex-1">
              Professional updates, sponsor announcements, network building, and career opportunities.
            </p>
            <a href="https://www.linkedin.com/company/andropedia-club/" target="_blank" rel="noreferrer" className="w-full py-3 px-4 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-all font-mono text-sm uppercase tracking-wider font-bold">
              Connect →
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-cyber-blue/20 bg-cyber-blue/5">
            <span className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse" />
            <span className="font-mono text-sm text-gray-400">Join <span className="text-white font-bold">500+ hackers</span> already registered</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
