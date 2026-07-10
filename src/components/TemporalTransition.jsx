import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionContext = createContext({
  triggerTransition: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

export default function TemporalTransitionProvider({ children }) {
  const [phase, setPhase] = useState('idle'); // idle, videoIn, flash, out
  const [callbackToRun, setCallbackToRun] = useState(null);

  const triggerTransition = useCallback((callback) => {
    // Transition disabled by user request. Execute immediately.
    if (callback) callback();
    
    // if (phase !== 'idle') return;
    // setCallbackToRun(() => callback);
    // setPhase('videoIn');
  }, []);

  useEffect(() => {
    if (phase === 'videoIn') {
      // Let the video play for ~1.1s, then flash
      const t = setTimeout(() => setPhase('flash'), 1100);
      return () => clearTimeout(t);
    } else if (phase === 'flash') {
      if (callbackToRun) {
        callbackToRun();
      }
      const t = setTimeout(() => setPhase('out'), 100);
      return () => clearTimeout(t);
    } else if (phase === 'out') {
      const t = setTimeout(() => {
        setPhase('idle');
        setCallbackToRun(null);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [phase, callbackToRun]);

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      
      {/*
      <AnimatePresence>
        {phase !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-cyber-deep flex items-center justify-center pointer-events-auto"
          >
            <video 
              src="/Transition_edited.mp4" 
              autoPlay 
              muted 
              playsInline 
              className={\`absolute inset-0 w-full h-full object-contain mix-blend-screen transition-opacity duration-500 \${
                phase === 'flash' ? 'opacity-0' : 'opacity-100'
              }\`}
            />
            
            <motion.div 
              className="absolute inset-0 bg-black/30"
              animate={{ opacity: phase === 'flash' ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />

            {phase === 'flash' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </TransitionContext.Provider>
  );
}
