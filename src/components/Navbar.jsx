import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from './TemporalTransition';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { triggerTransition } = useTransition();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Tracks', id: 'tracks' },
    { name: 'Timeline', id: 'timeline' },
    { name: 'Prizes', id: 'prizes' },
    { name: 'Judges', id: 'mentors' },
    { name: 'Sponsors', id: 'sponsors' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      triggerTransition(() => {
        navigate(`/#${id}`);
      });
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/register') {
      triggerTransition(() => {
        navigate('/register');
      });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-cyber-blue/10 ${
          scrolled ? 'bg-cyber-dark/80 backdrop-blur-[24px] py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 relative z-[101]"
            onClick={(e) => {
              e.preventDefault();
              if (!isHome) {
                triggerTransition(() => {
                  navigate('/');
                });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img 
              src="/Logo.jpeg" 
              alt="Androforge Logo" 
              className="w-10 h-10 object-contain rounded border border-cyber-neon/50 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all"
            />
            <span className="font-orbitron text-xl md:text-2xl font-bold tracking-wider hidden sm:block">
              <span className="text-white">ANDRO</span>
              <span className="text-cyber-neon neon-text-subtle">FORGE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="font-mono text-sm text-gray-400 hover:text-cyber-neon transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a 
              href="/register" 
              onClick={handleRegisterClick}
              className="btn-cyber ml-4 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
            >
              REGISTER
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white p-2 relative z-[101]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-cyber-deep/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <img src="/Logo.jpeg" alt="Logo" className="w-16 h-16 rounded mb-4 shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="font-orbitron text-2xl text-gray-300 hover:text-cyber-neon hover:scale-110 transition-all"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="/register" 
              onClick={handleRegisterClick}
              className="btn-cyber mt-4 text-xl px-12 py-4"
            >
              REGISTER
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
