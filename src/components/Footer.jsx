import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetallicPaint from './MetallicPaint';
import logoImg from '@assets/Logo-removebg-preview.png';

export default function Footer() {
  return (
    <footer className="w-full relative z-20 mt-20 border-t border-white/10">
      {/* Heavy blurred glass background */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-none"
        style={{ backdropFilter: 'blur(40px) saturate(150%)', WebkitBackdropFilter: 'blur(40px) saturate(150%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Brand & Description */}
          <div className="flex flex-col space-y-4 h-full max-w-sm z-20">
            {/* The relative wrapper takes up the normal document flow space */}
            <div className="relative w-full h-[80px] sm:h-[120px]">
              {/* The absolute container allows the logo to be huge without pushing flex items */}
              <div className="absolute top-1/2 left-[-150px] sm:left-[-220px] md:left-[-280px] -translate-y-1/2 w-[450px] sm:w-[650px] md:w-[850px] h-[180px] sm:h-[240px] md:h-[320px] drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] pointer-events-none">
                <MetallicPaint
                  imageSrc={logoImg}
                  seed={42}
                  scale={4}
                  patternSharpness={1}
                  noiseScale={0.5}
                  speed={0.3}
                  liquid={0.75}
                  mouseAnimation={false}
                  brightness={2}
                  contrast={0.5}
                  refraction={0.01}
                  blur={0.015}
                  chromaticSpread={2}
                  fresnel={1}
                  angle={0}
                  waveAmplitude={1}
                  distortion={1}
                  contour={0.2}
                  lightColor="#ffffff"
                  darkColor="#000000"
                  tintColor="#0ea5e9"
                />
              </div>
            </div>
            <p className="text-cyber-silver text-sm leading-relaxed max-w-xs pt-4">
              The ultimate 24-hour hackathon pushing the boundaries of technology, design, and innovation.
            </p>

            <div className="pt-12 mt-auto">
              <a href="#venue" className="flex items-center space-x-3 text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit group">
                <MapPin className="w-5 h-5 group-hover:text-[#1F51FF] transition-colors" />
                <span>SRM Ramapuram, Chennai</span>
              </a>
            </div>
          </div>

          {/* Right Side Columns */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-20 md:justify-end w-full md:w-2/3 mt-8 md:mt-0">

            {/* Important Links */}
            <div className="flex flex-col space-y-4 min-w-[150px]">
              <h4 className="text-lg font-bold text-white mb-2">Important Links</h4>
              <a href="#about" className="text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit">About</a>
              <a href="#timeline" className="text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit">Timeline</a>
              <a href="#faq" className="text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit">FAQs</a>
              <Link to="/contact" className="text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit">Committee</Link>
            </div>

            {/* Support & Social */}
            <div className="flex flex-col space-y-8 min-w-[200px]">
              {/* Support */}
              <div className="flex flex-col space-y-4">
                <h4 className="text-lg font-bold text-white mb-2">Support</h4>
                <a href="mailto:contact@androforge.com" className="text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit">Send an email</a>
                <Link to="/contact" className="text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit">Contact us</Link>
              </div>

              {/* Social */}
              <div className="flex flex-col space-y-4">
                <h4 className="text-lg font-bold text-white mb-2">Follow Us On</h4>
                <div className="flex flex-col space-y-4">
                  <a href="#" className="flex items-center space-x-3 text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:text-[#1F51FF] transition-colors">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a href="https://www.linkedin.com/company/andropedia-club/" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-cyber-silver hover:text-[#1F51FF] transition-colors duration-300 w-fit group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:text-[#1F51FF] transition-colors">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-cyber-silver/60">
          <p>© 2026 AndroForge. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-medium tracking-wide">Built by AndroPedia Club</p>
        </div>
      </div>
    </footer>
  );
}
