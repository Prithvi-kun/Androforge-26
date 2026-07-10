import { motion } from 'framer-motion';

export default function Sponsors() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  const SponsorTier = ({ title, colorClass, children }) => (
    <div className="mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-6"
      >
        <h3 className={`font-orbitron text-sm uppercase tracking-widest ${colorClass}`}>{title}</h3>
        <div className="h-px w-24 bg-current opacity-30 mt-2" style={{ color: 'inherit' }} />
      </motion.div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap justify-center gap-4 md:gap-6"
      >
        {children}
      </motion.div>
    </div>
  );

  const LogoCard = ({ name, tierClass = '' }) => (
    <motion.div 
      variants={itemVariants}
      className={`glass-card flex items-center justify-center p-6 text-center hover:scale-105 transition-transform ${tierClass}`}
    >
      <span className="font-orbitron font-bold tracking-wider">{name}</span>
    </motion.div>
  );

  return (
    <section id="sponsors" className="relative">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">BACKED BY THE BEST</p>
          <h2 className="section-title text-3xl md:text-4xl">Sponsors & Partners</h2>
        </motion.div>

        {/* Title Sponsor */}
        <SponsorTier title="Title Sponsor" colorClass="text-cyber-gold">
          <LogoCard 
            name="Your Company Here" 
            tierClass="w-full max-w-lg h-40 md:h-48 text-2xl md:text-3xl text-cyber-gold border-cyber-gold/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:border-cyber-gold/50" 
          />
        </SponsorTier>

        {/* Gold Sponsors */}
        <SponsorTier title="Gold Sponsors" colorClass="text-yellow-200">
          <LogoCard name="TechCorp" tierClass="w-full max-w-sm sm:w-[45%] lg:w-[30%] h-32 text-xl text-yellow-200 border-yellow-200/20 hover:border-yellow-200/40" />
          <LogoCard name="InnovateLabs" tierClass="w-full max-w-sm sm:w-[45%] lg:w-[30%] h-32 text-xl text-yellow-200 border-yellow-200/20 hover:border-yellow-200/40" />
        </SponsorTier>

        {/* Silver Sponsors */}
        <SponsorTier title="Silver Sponsors" colorClass="text-gray-300">
          <LogoCard name="DataFlow" tierClass="w-[45%] sm:w-[30%] lg:w-[22%] h-24 text-lg text-gray-300" />
          <LogoCard name="CloudNine" tierClass="w-[45%] sm:w-[30%] lg:w-[22%] h-24 text-lg text-gray-300" />
          <LogoCard name="DevStack" tierClass="w-[45%] sm:w-[30%] lg:w-[22%] h-24 text-lg text-gray-300" />
        </SponsorTier>

        {/* Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-12 border-t border-cyber-blue/20">
          
          {/* Community Partners */}
          <div>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-orbitron text-sm text-cyber-blue text-center mb-6"
            >
              COMMUNITY PARTNERS
            </motion.h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <LogoCard name="GDG Chennai" tierClass="h-20 text-sm text-gray-400 glass-subtle" />
              <LogoCard name="IEEE Student Branch" tierClass="h-20 text-sm text-gray-400 glass-subtle" />
              <LogoCard name="Startup TN" tierClass="h-20 text-sm text-gray-400 glass-subtle" />
              <LogoCard name="NASSCOM" tierClass="h-20 text-sm text-gray-400 glass-subtle" />
            </motion.div>
          </div>

          {/* Media Partners */}
          <div>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-orbitron text-sm text-cyber-purple text-center mb-6"
            >
              MEDIA PARTNERS
            </motion.h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <LogoCard name="TechCrunch India" tierClass="h-20 text-sm text-gray-400 glass-subtle" />
              <LogoCard name="YourStory" tierClass="h-20 text-sm text-gray-400 glass-subtle" />
              <LogoCard name="Inc42" tierClass="h-20 text-sm text-gray-400 glass-subtle col-span-2 mx-auto w-[calc(50%-0.5rem)]" />
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <a href="mailto:sponsors@androforge.tech" className="btn-cyber-outline">
            Become a Sponsor →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
