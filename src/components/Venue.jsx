import { motion } from 'framer-motion';

export default function Venue() {
  const details = [
    { icon: "📍", text: "45 mins from Chennai Central" },
    { icon: "🅿️", text: "Free parking available" },
    { icon: "🍽️", text: "Food & refreshments provided" },
    { icon: "🛏️", text: "Accommodation arranged for outstation participants" }
  ];

  return (
    <section id="venue" className="relative">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-subtitle mb-3">WHERE IT HAPPENS</p>
          <h2 className="section-title text-3xl md:text-4xl">Venue</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Details Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 flex flex-col justify-center border-l-2 border-l-cyber-neon"
          >
            <h3 className="font-orbitron text-xl md:text-2xl text-white mb-2">
              SRM Institute of Science and Technology
            </h3>
            <p className="font-mono text-sm text-cyber-blue mb-8 leading-relaxed">
              SRM Nagar, Kattankulathur,<br/>
              Chengalpattu District,<br/>
              Tamil Nadu 603203
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {details.map((detail, i) => (
                <div key={i} className="glass-subtle p-3 rounded flex items-center gap-3">
                  <span className="text-xl shrink-0">{detail.icon}</span>
                  <span className="text-xs text-gray-300 font-grotesk leading-tight">{detail.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-cyber-blue/20">
              <p className="font-mono text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse" />
                Near Potheri Railway Station · On GST Road (NH45)
              </p>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-2 overflow-hidden h-[400px] lg:h-auto border-cyber-blue/20 relative group"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neon z-10" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-neon z-10" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-neon z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-neon z-10" />

            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.4534895672!2d80.04!3d12.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSRM+Institute!5e0!3m2!1sen!2sin!4v1" 
              className="w-full h-full rounded opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0 filter"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="SRM Institute Google Maps location"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
