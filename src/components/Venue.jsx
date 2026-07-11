import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

export default function Venue() {
  const details = [
    { icon: "📍", text: "45 mins from Chennai Central" },
    { icon: "🅿️", text: "Free parking available" },
    { icon: "🍽️", text: "Food & refreshments provided" },
    { icon: "🛏️", text: "Accommodation arranged for outstation participants" }
  ];

  return (
    <section id="venue" className="relative pointer-events-auto">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <h2 className="w-fit mx-auto text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-blue drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] tracking-wider">VENUE</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">

          {/* Details Card (60%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 h-full"
          >
            <BorderGlow
              glowColor="180 100% 50%"
              intensity={0.6}
              borderRadius={16}
              className="h-full bg-black/40 backdrop-blur-md overflow-hidden relative"
            >
              {/* Bulletproof perfectly matching white border */}
              <div className="absolute inset-0 pointer-events-none z-0" style={{ borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4)' }} />
              <div className="p-8 md:p-10 flex flex-col h-full z-10 relative">
                <h3 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
                  SRM Institute of Science and Technology
                </h3>
                <p className="font-mono text-sm text-cyber-blue mb-10 leading-relaxed">
                  SRM Nagar, Kattankulathur,<br />
                  Chengalpattu District,<br />
                  Tamil Nadu 603203.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {details.map((detail, i) => (
                    <BorderGlow
                      key={i}
                      glowColor="180 100% 50%"
                      intensity={0.5}
                      borderRadius={16}
                      className="bg-white/5 transition-all cursor-pointer relative"
                    >
                      {/* Bulletproof perfectly matching white border and blur without class overrides */}
                      <div className="absolute inset-0 pointer-events-none z-0 backdrop-blur-[24px]" style={{ borderRadius: 'inherit', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)' }} />
                      <div className="flex items-center gap-4 p-4 w-full h-full relative z-10">
                        <span className="text-2xl shrink-0">{detail.icon}</span>
                        <span className="text-sm text-gray-200 font-grotesk leading-tight">{detail.text}</span>
                      </div>
                    </BorderGlow>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-cyber-blue/30">
                  <p className="font-mono text-sm text-gray-400 uppercase tracking-wider flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyber-neon animate-pulse" />
                    Opposite Potheri Railway Station · On GST Road (NH45)
                  </p>
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Map Embed (40%) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 glass-card p-2 overflow-hidden h-[400px] lg:h-full border-cyber-blue/20 relative group rounded-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.4534895672!2d80.04!3d12.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSRM+Institute!5e0!3m2!1sen!2sin!4v1"
              className="w-full h-full filter invert-[90%] hue-rotate-180 brightness-[85%] contrast-[85%]"
              style={{ border: 0, borderRadius: '16px' }}
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
