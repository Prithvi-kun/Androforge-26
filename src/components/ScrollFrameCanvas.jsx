// src/components/ScrollFrameCanvas.jsx
// Scroll-jacked canvas that plays through a sequence of image frames
// tied to scroll position — like Apple's AirPods Pro page effect.

import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 120;

// Build frame paths (served from /public/frames/)
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${num}.jpg`;
});

export default function ScrollFrameCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);

  // Preload all images
  useEffect(() => {
    const images = [];
    let loaded = 0;

    framePaths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images[i] = img;
    });

    imagesRef.current = images;

    return () => {
      // Cleanup
      images.forEach(img => { img.onload = null; });
    };
  }, []);

  // Draw a frame on the canvas, covering the full viewport
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    // Cover the canvas (like object-fit: cover)
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Handle scroll → pick frame
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafRef.current) return; // throttle to rAF

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = container.getBoundingClientRect();
        const scrollableHeight = container.offsetHeight - window.innerHeight;

        // How far through the container we've scrolled (0 → 1)
        const rawProgress = -rect.top / scrollableHeight;
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        const frameIndex = Math.min(
          Math.floor(progress * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Draw initial frame
    drawFrame(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, loadedCount]);

  // Resize canvas to match window
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  const loadingPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      ref={containerRef}
      className="relative"
      // Height determines how many pixels of scroll = full animation.
      // 120 frames × ~40px per frame ≈ 4800px of scroll distance.
      style={{ height: `${TOTAL_FRAMES * 40}px` }}
    >
      {/* Sticky canvas fills the viewport while you scroll through the container */}
      <div className="sticky top-0 w-full h-screen">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block', background: '#000' }}
        />

        {/* Loading indicator */}
        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-blue to-[#1F51FF] rounded-full transition-all duration-200"
                  style={{ width: `${loadingPercent}%` }}
                />
              </div>
              <p className="text-cyber-silver text-sm font-mono tracking-wider">
                Loading {loadingPercent}%
              </p>
            </div>
          </div>
        )}

        {/* Scroll hint at the very start */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-500"
          id="scroll-hint"
        >
          <p className="text-white/60 text-xs font-mono tracking-widest uppercase">
            Scroll to explore
          </p>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
