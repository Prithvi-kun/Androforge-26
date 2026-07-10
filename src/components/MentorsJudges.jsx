import { motion } from 'framer-motion';

export default function MentorsJudges() {
  const judges = [
    { name: "Dr. Priya Sharma", role: "Chief AI Officer", company: "TechNova Labs", tags: ["AI/ML", "Deep Learning"] },
    { name: "Rajesh Kumar", role: "VP Engineering", company: "BlockChain India", tags: ["Web3", "DeFi"] },
    { name: "Dr. Anitha Menon", role: "Professor", company: "IIT Madras", tags: ["Computer Science"] },
    { name: "Vikram Patel", role: "CTO", company: "FinStack", tags: ["FinTech", "Payments"] },
    { name: "Sneha Reddy", role: "Design Lead", company: "Figma India", tags: ["UI/UX", "Design Systems"] },
    { name: "Arjun Nair", role: "CEO", company: "HealthAI", tags: ["HealthTech", "Biotech"] }
  ];

  const mentors = [
    { name: "Kavitha Rajan", role: "Senior Engineer", company: "Google", tags: ["Cloud", "Infrastructure"] },
    { name: "Mohammed Faiz", role: "Staff Engineer", company: "Razorpay", tags: ["Payments", "APIs"] },
    { name: "Divya Krishnan", role: "ML Engineer", company: "Microsoft", tags: ["AI/ML", "NLP"] },
    { name: "Sanjay Gupta", role: "Architect", company: "Amazon", tags: ["Distributed Systems"] },
    { name: "Meera Iyer", role: "Product Lead", company: "Swiggy", tags: ["Product", "Growth"] },
    { name: "Rohit Verma", role: "Open Source Lead", company: "Red Hat", tags: ["DevOps", "Linux"] }
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

  const ProfileCard = ({ person }) => (
    <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
      <div className="w-24 h-24 rounded-full bg-cyber-darker border-2 border-cyber-neon/30 flex items-center justify-center mb-4 group-hover:border-cyber-neon transition-colors shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        <span className="font-orbitron text-2xl text-cyber-neon">{getInitials(person.name)}</span>
      </div>
      <h3 className="font-orbitron text-sm text-white mb-1 group-hover:text-cyber-neon transition-colors">{person.name}</h3>
      <p className="font-mono text-xs text-gray-400 mb-1">{person.role}</p>
      <p className="font-mono text-xs text-cyber-blue mb-4">{person.company}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-auto">
        {person.tags.map((tag, i) => (
          <span key={i} className="bg-cyber-blue/10 text-cyber-neon text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="mentors" className="relative">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">INDUSTRY EXPERTS</p>
          <h2 className="section-title text-3xl md:text-4xl">Mentors & Judges</h2>
        </motion.div>

        {/* Judges Section */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <h3 className="font-orbitron text-xl text-white">Jury Panel</h3>
            <div className="h-px bg-cyber-blue/30 flex-1" />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          >
            {judges.map((judge, i) => <ProfileCard key={i} person={judge} />)}
          </motion.div>
        </div>

        {/* Mentors Section */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <h3 className="font-orbitron text-xl text-white">Technical Mentors</h3>
            <div className="h-px bg-cyber-purple/30 flex-1" />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          >
            {mentors.map((mentor, i) => <ProfileCard key={i} person={mentor} />)}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
