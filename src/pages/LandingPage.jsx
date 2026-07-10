// src/pages/LandingPage.jsx
// Androforge 2026 — Landing / Splash Page
// Video loops, logo top-left. Hold SPACE 2s → zoom into center + fade to black → /home

import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import logoImg from '@assets/Logo-removebg-preview.png';
import bgVideo from '@assets/Black_hole_2.webm';
import MetallicPaint from '../components/MetallicPaint';

const HOLD_DURATION = 2000; // 2 seconds

export default function LandingPage() {
  const navigate = useNavigate();
  const bgVideoRef = useRef(null);
  const holdTimer = useRef(null);

  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const holdStartRef = useRef(null);
  const progressRafRef = useRef(null);

  const videoControls = useAnimation();
  const fadeControls = useAnimation();

  // Update hold progress bar
  const updateProgress = useCallback(() => {
    if (!holdStartRef.current) return;
    const elapsed = performance.now() - holdStartRef.current;
    const progress = Math.min(elapsed / HOLD_DURATION, 1);
    setHoldProgress(progress);

    if (progress < 1) {
      progressRafRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  // Fade to black, then navigate
  const playTransition = useCallback(async () => {
    setIsTransitioning(true);

    // Fade overlay to black over 0.8s
    await fadeControls.start({
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeIn' },
    });

    // Navigate after fully black
    window.ignoreSpaceUntilLift = true;
    window.scrollTo(0, 0);
    navigate('/home');
  }, [fadeControls, navigate]);

  // Spacebar hold logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !e.repeat && !isTransitioning) {
        e.preventDefault();
        setIsHolding(true);
        holdStartRef.current = performance.now();
        setHoldProgress(0);
        progressRafRef.current = requestAnimationFrame(updateProgress);

        if (holdTimer.current) clearTimeout(holdTimer.current);

        holdTimer.current = setTimeout(() => {
          setIsHolding(false);
          setHoldProgress(0);
          if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
          playTransition();
        }, HOLD_DURATION);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsHolding(false);
        setHoldProgress(0);
        holdStartRef.current = null;
        if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
        if (holdTimer.current) {
          clearTimeout(holdTimer.current);
          holdTimer.current = null;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
    };
  }, [isTransitioning, playTransition, updateProgress]);

  return (
    <div
      className="landing-page select-none touch-none relative w-full h-screen overflow-hidden"
      style={{ background: '#000' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Background Video — loops */}
      <div className="absolute inset-0">
        <video
          ref={bgVideoRef}
          className="w-full h-full pointer-events-none"
          style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={bgVideo} type="video/webm" />
        </video>
      </div>

      {/* Black fade overlay — starts transparent, fades to black during transition */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={fadeControls}
        style={{ zIndex: 4 }}
      />

      {/* Gentle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* ═══ Logo — top left with MetallicPaint effect ═══ */}
      <motion.div
        className="absolute -top-[20px] -left-[140px] sm:-top-10 sm:-left-[180px] z-20 pointer-events-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isTransitioning ? 0 : 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-[450px] sm:w-[650px] md:w-[850px] h-[180px] sm:h-[240px] md:h-[320px] drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
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
      </motion.div>

      {/* ═══ Bottom — Hold SPACE progress ═══ */}
      <motion.div
        className="absolute bottom-6 left-0 w-full z-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 20 : 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* Text Progress */}
        <div className="flex flex-col items-center space-y-3">
          {/* Base Text (Default Neon Glow) */}
          <div 
            className="text-xs sm:text-sm md:text-base font-mono tracking-[0.3em] uppercase font-bold text-white/80"
            style={{ textShadow: '0 0 10px rgba(14, 165, 233, 0.8), 0 0 20px rgba(14, 165, 233, 0.4)' }}
          >
            Hold Space
          </div>
          
          {/* Tiny Progress Bar */}
          <div className="w-32 h-[3px] bg-white/20 rounded-full overflow-hidden shadow-[0_0_10px_rgba(14,165,233,0.5)] relative">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-400 to-[#1F51FF] rounded-full"
              style={{ width: `${holdProgress * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Subtle particle dots */}
      <div className="landing-particles pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="landing-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
