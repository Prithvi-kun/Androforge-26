import { motion } from 'framer-motion';

export default function Contact() {
  const coordinators = [
    {
      name: "Prithvi",
      role: "Lead Organizer",
      phone: "+91 98765 43210",
      email: "prithvi@androforge.tech",
      isStudent: true
    },
    {
      name: "Aishwarya R",
      role: "Technical Head",
      phone: "+91 98765 43211",
      email: "aishwarya@androforge.tech",
      isStudent: true
    },
    {
      name: "Dr. Senthil Kumar",
      role: "Faculty Advisor",
      phone: null,
      email: "senthil@srm.edu.in",
      isStudent: false
    }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="relative pb-10">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">GET IN TOUCH</p>
          <h2 className="section-title text-3xl md:text-4xl">Contact Us</h2>
        </motion.div>

        {/* Coordinators */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto"
        >
          {coordinators.map((coord, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card p-6 flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 shadow-[0_0_15px_rgba(34,211,238,0.1)] ${coord.isStudent ? 'bg-cyber-dark border-cyber-neon/30 text-cyber-neon' : 'bg-cyber-darker border-cyber-purple/30 text-cyber-purple'}`}>
                <span className="font-orbitron text-xl">{getInitials(coord.name)}</span>
              </div>
              <h3 className="font-orbitron text-lg text-white mb-1">{coord.name}</h3>
              <p className="font-mono text-xs text-gray-400 mb-4 uppercase tracking-wider">{coord.role}</p>
              
              <div className="space-y-2 w-full mt-auto">
                {coord.phone && (
                  <a href={`tel:${coord.phone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-cyber-neon transition-colors p-2 rounded bg-white/5 hover:bg-cyber-blue/10">
                    <span>📱</span> {coord.phone}
                  </a>
                )}
                <a href={`mailto:${coord.email}`} className="flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-cyber-neon transition-colors p-2 rounded bg-white/5 hover:bg-cyber-blue/10">
                  <span>📧</span> {coord.email}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Direct Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card p-6 md:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-6 text-center border-t border-t-cyber-blue/30"
        >
          <div>
            <p className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Email Us</p>
            <a href="mailto:hackathon@androforge.tech" className="text-lg text-white hover:text-cyber-neon transition-colors font-semibold">
              hackathon@androforge.tech
            </a>
          </div>
          <div className="hidden sm:block w-px h-12 bg-cyber-blue/20" />
          <div>
            <p className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Call Us</p>
            <a href="tel:+919876543210" className="text-lg text-white hover:text-cyber-neon transition-colors font-semibold">
              +91 98765 43210
            </a>
          </div>
          <div className="hidden sm:block w-px h-12 bg-cyber-blue/20" />
          <div>
            <p className="font-mono text-xs text-gray-500 mb-2 uppercase tracking-widest">Website</p>
            <a href="https://androforge.tech" target="_blank" rel="noreferrer" className="text-lg text-white hover:text-cyber-neon transition-colors font-semibold">
              androforge.tech
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
