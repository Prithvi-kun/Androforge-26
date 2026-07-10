import { motion } from 'framer-motion';

export default function JudgingCriteria() {
  const criteria = [
    {
      title: "Innovation & Creativity",
      percent: 25,
      desc: "Originality of the idea and creative problem-solving approach"
    },
    {
      title: "Technical Complexity",
      percent: 20,
      desc: "Code quality, architecture, and technical implementation depth"
    },
    {
      title: "Feasibility & Scalability",
      percent: 20,
      desc: "Real-world viability and potential for growth"
    },
    {
      title: "UI/UX Design",
      percent: 15,
      desc: "User interface design, experience flow, and accessibility"
    },
    {
      title: "Presentation & Demo",
      percent: 10,
      desc: "Clarity of pitch, demo quality, and team communication"
    },
    {
      title: "Social Impact",
      percent: 10,
      desc: "Positive impact on society, environment, or community"
    }
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
    <section id="judging" className="relative">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">EVALUATION MATRIX</p>
          <h2 className="section-title text-3xl md:text-4xl">Judging Criteria</h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {criteria.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card p-6 flex flex-col justify-center">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-orbitron text-sm text-white">{item.title}</h3>
                <span className="font-mono text-lg text-cyber-neon font-bold">{item.percent}%</span>
              </div>
              <p className="text-xs text-gray-400 mb-4 h-8">{item.desc}</p>
              
              {/* Progress Bar Container */}
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
                {/* Animated Fill */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyber-blue to-cyber-neon rounded-full"
                  style={{ boxShadow: '0 0 10px rgba(34,211,238,0.8)' }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
