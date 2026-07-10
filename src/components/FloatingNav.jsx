// src/components/FloatingNav.jsx
// Floating pill-shaped bottom navigation — Apple/Linear/Stripe inspired

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from './TemporalTransition';
import { Users } from 'lucide-react';
import PillNav from './PillNav';

const SECTION_ITEMS = [
  { label: 'About',       id: 'about' },
  { label: 'Tracks',      id: 'tracks' },
  { label: 'Rewards',     id: 'rewards' },
  { label: 'Timeline',    id: 'timeline' },
  { label: 'Venue',       id: 'venue' },
  { label: 'FAQs',        id: 'faq' },
];

export default function FloatingNav() {
  const [activeId, setActiveId] = useState('about');
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [footerOffset, setFooterOffset] = useState(0);
  const lastScrollY = useRef(0);
  const hideTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerTransition } = useTransition();

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  // ── Track footer position to push nav bar up ──
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (footerRect.top < windowHeight) {
        setFooterOffset(windowHeight - footerRect.top);
      } else {
        setFooterOffset(0);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Track which section is in view ──
  useEffect(() => {
    const observers = [];

    SECTION_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);


  // ── Home click — navigate back to landing page ──
  const handleHomeClick = useCallback((e) => {
    e.preventDefault();
    setMobileOpen(false);
    navigate('/');
  }, [navigate]);

  // ── Contact click — navigate to contact page ──
  const handleContactClick = useCallback((e) => {
    e.preventDefault();
    setMobileOpen(false);
    navigate('/contact');
  }, [navigate]);

  // ── Section click — transition then scroll to section ──
  const handleSectionClick = useCallback((e, id) => {
    e.preventDefault();
    setMobileOpen(false);

    const el = document.getElementById(id);
    if (el) {
      if (activeId === id) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    } else {
      // Element not found on this page (e.g. we are on /contact), redirect to /home#id
      navigate(`/home#${id}`);
      // Fallback for forcing a reload if react-router doesn't jump
      setTimeout(() => {
        window.location.hash = id;
      }, 100);
    }
  }, [activeId, navigate]);

  const navItems = useMemo(() => [
    { 
      label: 'Home', 
      href: '/', 
      onClick: handleHomeClick 
    },
    ...SECTION_ITEMS.map(item => ({
      label: item.label,
      href: `#${item.id}`,
      onClick: (e) => handleSectionClick(e, item.id)
    }))
  ], [handleHomeClick, handleSectionClick]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          style={{ position: 'fixed', bottom: footerOffset, left: 0, right: 0, zIndex: 100 }}
        >
          <PillNav
            items={navItems}
            activeHref={isHomePage ? (activeId ? `#${activeId}` : '/') : null}
            baseColor="rgba(255, 255, 255, 0.05)"
            pillColor="rgba(31, 81, 255, 0.5)" /* #1F51FF with opacity */
            pillTextColor="#94a3b8" /* cyber-silver */
            hoveredPillTextColor="#ffffff"
            onMobileMenuClick={() => setMobileOpen(!mobileOpen)}
            rightAction={{
              icon: Users,
              href: '/contact',
              ariaLabel: 'Contact',
              onClick: handleContactClick,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
