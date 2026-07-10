import { motion } from 'framer-motion';

export default function Eligibility() {
  const rules = [
    "Open to all undergraduate and postgraduate students",
    "Participants from any college/university across India",
    "No restriction on branch or department",
    "Basic programming knowledge recommended",
    "Must carry valid college ID card",
    "Participants must be 18+ years old"
  ];

  const teamRules = [
    { icon: "👥", text: "Team size: 2-4 members" },
    { icon: "🏫", text: "Cross-college teams allowed" },
    { icon: "🎯", text: "Each team selects one track" },
    { icon: "📝", text: "All members must register individually" },
    { icon: "🤝", text: "Solo participants will be matched with teams" },
    { icon: "⚠️", text: "Team name must be unique" }
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="eligibility" className="relative">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">WHO CAN PARTICIPATE</p>
          <h2 className="section-title text-3xl md:text-4xl">Eligibility & Teams</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Eligibility Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 border-t border-t-cyber-blue/30"
          >
            <h3 className="font-orbitron text-xl text-white mb-6 flex items-center gap-3">
              <span className="text-cyber-neon text-2xl">⚡</span> Eligibility Criteria
            </h3>
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {rules.map((rule, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1 shrink-0 text-sm">✅</span>
                  <span className="text-gray-300 text-sm leading-relaxed">{rule}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Team Rules Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 border-t border-t-cyber-purple/30"
          >
            <h3 className="font-orbitron text-xl text-white mb-6 flex items-center gap-3">
              <span className="text-cyber-purple text-2xl">💠</span> Team Formation
            </h3>
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {teamRules.map((rule, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5 shrink-0">{rule.icon}</span>
                  <span className="text-gray-300 text-sm leading-relaxed mt-1">{rule.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-subtle p-4 rounded-lg flex items-start sm:items-center gap-3 border border-cyber-blue/10 bg-cyber-blue/5"
        >
          <span className="text-xl shrink-0">ℹ️</span>
          <p className="text-sm text-gray-400 font-mono">
            Registrations are reviewed. Shortlisted teams will be notified via email.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
