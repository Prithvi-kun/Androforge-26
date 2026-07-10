import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Register from './pages/Register';
import TemporalTransitionProvider from './components/TemporalTransition';

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && window.ignoreSpaceUntilLift) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        window.ignoreSpaceUntilLift = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp, { capture: true });
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Global SVG filter for glass refraction effect */}
      <svg className="hidden" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="glass-refraction" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.02"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <TemporalTransitionProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </TemporalTransitionProvider>
    </BrowserRouter>
  );
}
