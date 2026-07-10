import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const targetDate = new Date('2026-09-30T09:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong px-8 py-4 rounded-xl border-cyber-neon/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
      >
        <p className="font-orbitron text-2xl text-cyber-neon animate-pulse">EVENT STARTED!</p>
      </motion.div>
    );
  }

  const formatNumber = (num) => num.toString().padStart(2, '0');

  const TimeUnit = ({ value, label }) => (
    <div className="countdown-card">
      <div className="countdown-value">{formatNumber(value)}</div>
      <div className="countdown-label">{label}</div>
    </div>
  );

  const Separator = () => (
    <div className="text-cyber-neon text-3xl font-orbitron pb-6 animate-pulse hidden sm:block">:</div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-row items-center gap-2 sm:gap-4"
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <Separator />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <Separator />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <Separator />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </motion.div>
  );
}
