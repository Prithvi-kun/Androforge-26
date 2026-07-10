// src/components/FlipCountdown.jsx
// Androforge 2026 — Flip Calendar Countdown Timer

import { useState, useEffect, useRef } from 'react';

// Target date: September 30, 2026 at midnight IST
const TARGET_DATE = new Date('2026-09-30T00:00:00+05:30').getTime();

function getTimeRemaining() {
  const now = Date.now();
  const diff = Math.max(0, TARGET_DATE - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ─── Single Flip Card ─── */
function FlipCard({ value, label, isWide }) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (value !== current) {
      setPrevious(current);
      setCurrent(value);
      setFlipping(true);

      const timer = setTimeout(() => setFlipping(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const pad = isWide ? 3 : 2;
  const displayCurrent = String(current).padStart(pad, '0');
  const displayPrevious = String(previous).padStart(pad, '0');

  return (
    <div className="flip-unit-container">
      <div className={`flip-unit ${isWide ? 'flip-unit-wide' : ''}`}>
        {/* Static top half — shows CURRENT value */}
        <div className="flip-card-top">
          <span>{displayCurrent}</span>
        </div>

        {/* Static bottom half — shows CURRENT value */}
        <div className="flip-card-bottom">
          <span>{displayCurrent}</span>
        </div>

        {/* Animated: top flap flips down, starts showing PREVIOUS, lands to reveal current underneath */}
        <div className={`flip-card-top-flip ${flipping ? 'flip-anim' : ''}`}>
          <span>{flipping ? displayPrevious : displayCurrent}</span>
        </div>

        {/* Animated: bottom flap flips up then settles, revealing current value */}
        <div className={`flip-card-bottom-flip ${flipping ? 'flip-anim' : ''}`}>
          <span>{displayCurrent}</span>
        </div>

        {/* Center divider line */}
        <div className="flip-divider" />
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}

/* ─── Separator Dots ─── */
function Separator() {
  return (
    <div className="flip-separator">
      <span className="flip-dot" />
      <span className="flip-dot" />
    </div>
  );
}

/* ─── Main Countdown ─── */
export default function FlipCountdown() {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flip-countdown-glass">
      <div className="flip-countdown">
        <FlipCard value={time.days} label="Days" isWide />
        <Separator />
        <FlipCard value={time.hours} label="Hours" />
        <Separator />
        <FlipCard value={time.minutes} label="Minutes" />
        <Separator />
        <FlipCard value={time.seconds} label="Seconds" />
      </div>
    </div>
  );
}
