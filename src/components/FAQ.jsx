import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BorderGlow from './BorderGlow';

const faqs = [
  {
    question: "What is AndroForge?",
    answer: "AndroForge is a 24-hour hackathon organized by the AndroPedia club of SRM Ramapuram. It is an opportunity for students to come together, collaborate, and create innovative solutions to real-world problems."
  },
  {
    question: "Who can participate?",
    answer: "The hackathon is open to all university students, recent graduates, and professional developers. You can participate solo or in a team of up to 3 members."
  },
  {
    question: "Is there a registration fee?",
    answer: "The first round is free of cost. It will happen online. The participants who get selected for the second round will have to come to hackathon venue to participate and pay a registration fee of Rs. 300 per team."
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, any hardware you plan to use, a valid ID, and a sleeping bag if you plan to stay overnight at the venue."
  },
  {
    question: "Can I start working on my project before the event?",
    answer: "No. To ensure a fair playing field, all coding and design work must begin only after the official hacking period starts. Participants who are found to have pre-worked on their project will be disqualified."
  },
  {
    question: "Will there be food and refreshments for participants?",
    answer: "Yes, dinner is included and we will also be providing refreshments at regular intervals."
  },
  {
    question: "How are the projects judged?",
    answer: "Projects are judged on technical complexity, innovation, design, and practical utility."
  },
  {
    question: "What amenities are provided?",
    answer: "We provide basic amenities like charging ports, tables, chairs and wi-fi. If your project relies on specific hardware, it's best to bring your own."
  },
  {
    question: "How do I submit my final project?",
    answer: "Projects must be pushed to GitHub by the deadline. You will need to include a link to your public repository."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default, as in the image

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="w-full max-w-5xl mx-auto px-4 pt-12 pb-24 flex flex-col items-center">
      <div className="text-center mb-12 pointer-events-auto">
        <h2 className="w-fit mx-auto text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-blue drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] tracking-wider mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-cyber-silver text-lg">
          Have a question we didn't answer? <Link to="/contact" className="text-cyber-neon hover:underline">Contact us ↗</Link>
        </p>
      </div>

      {/* Main Big Container with strong blur */}
      <div className="w-full glass-strong p-6 md:p-10 pointer-events-auto relative overflow-hidden">
        {/* Subtle grid background for the container to make it look premium */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />

        <div className="flex flex-col gap-3 relative z-10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="w-full relative"
                layout
              >
                <BorderGlow
                  className="w-full h-full cursor-pointer pointer-events-auto"
                  backgroundColor="transparent"
                  borderRadius={16}
                  glowColor="0 0 100"
                  glowRadius={45}
                  glowIntensity={1.5}
                  edgeSensitivity={35}
                  fillOpacity={0}
                  colors={['#ffffff', '#ffffff', '#ffffff']}
                >
                  <div
                    className={`w-full h-full rounded-2xl overflow-hidden border transition-colors duration-300 ${isOpen
                      ? 'bg-white/10 border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]' // Lighter active state
                      : 'bg-white/5 border-white/5 shadow-md hover:bg-white/10'        // Darker inactive state
                      }`}
                    onClick={() => toggleOpen(index)}
                  >
                    <div className="px-6 py-5 flex items-center justify-between">
                      <h3 className={`font-semibold text-lg transition-colors ${isOpen ? 'text-white' : 'text-cyber-silver'}`}>
                        {faq.question}
                      </h3>

                      {/* The Plus/Minus Icon */}
                      <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0 ml-4">
                        <motion.div
                          className="absolute w-4 h-0.5 bg-cyber-silver rounded-full"
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute w-4 h-0.5 bg-cyber-silver rounded-full"
                          animate={{ rotate: isOpen ? 180 : 90, opacity: isOpen ? 0 : 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-0 text-gray-300 leading-relaxed border-t border-white/10 mt-2 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
