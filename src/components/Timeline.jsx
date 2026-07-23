import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, Trophy, Rocket, Star } from 'lucide-react';
import BorderGlow from './BorderGlow';

/* ΓöÇΓöÇ Timeline data ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const steps = [
  {
    number: '1',
    title: 'Online Application',
    description:
      'Participants have to submit a presentation for the problem statement chosen.',
    Icon: FileText,
  },
  {
    number: '2',
    title: 'Online Shortlisting',
    description:
      'Applications will be shortlisted and 75 teams will be selected who will have to come to the hackathon at the venue.',
    Icon: Code,
  },
  {
    number: '3',
    title: 'Hackathon Registration',
    description:
      'The shortlisted participants will be sent a mail to register for the hackathon through our official portal which will contain all the necessary details.',
    Icon: Trophy,
  },
  {
    number: '4',
    title: 'Hackathon Day',
    description:
      'Shortlisted participants will report at the venue where the hackathon is conducted for 24 hours.',
    Icon: Rocket,
  },
  {
    number: '5',
    title: 'Final Round',
    description:
      'Final round of judging takes place after which prizes are distributed.',
    Icon: Star,
  },
];

/* ΓöÇΓöÇ Wave math constants ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const NODE_SPACING = 360;
const WAVE_AMPLITUDE = 80;
const PADDING_X = 200;
const SVG_HEIGHT = 400;
const MID_Y = SVG_HEIGHT / 2;
const NODE_RADIUS = 32;
const TEXT_GAP = 20; // gap between icon edge and text block

/* ΓöÇΓöÇ Build the SVG path ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function buildWavePath(count) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const x = PADDING_X + i * NODE_SPACING;
    const y = i % 2 === 0 ? MID_Y + WAVE_AMPLITUDE : MID_Y - WAVE_AMPLITUDE;
    points.push({ x, y });
  }

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    d += ` C ${midX} ${curr.y}, ${midX} ${next.y}, ${next.x} ${next.y}`;
  }

  return { d, points };
}

/* ΓöÇΓöÇ Component ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
export default function Timeline() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        const atLeft = el.scrollLeft === 0;
        const atRight = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;
        
        if ((e.deltaY < 0 && !atLeft) || (e.deltaY > 0 && !atRight)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }
    };
    
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const totalWidth = PADDING_X * 2 + (steps.length - 1) * NODE_SPACING;
  const { d, points } = buildWavePath(steps.length);

  return (
    <section
      id="timeline"
      className="w-full pt-8 pb-20 pointer-events-none flex flex-col items-center"
    >
      {/* Section heading */}
      <div className="text-center mb-4 pointer-events-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-blue drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] tracking-wider">
          TIMELINE
        </h2>
        <p className="mt-4 text-cyber-silver max-w-xl mx-auto text-lg">
          Your journey from registration to glory
        </p>
      </div>

      {/* Horizontally scrollable canvas */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto pointer-events-auto timeline-scroll select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`.timeline-scroll::-webkit-scrollbar { display: none; }`}</style>

        <div
          className="relative"
          style={{
            width: totalWidth,
            height: SVG_HEIGHT + 160,
            minWidth: totalWidth,
          }}
        >
          {/* ΓöÇΓöÇ SVG wave line ΓöÇΓöÇ */}
          <svg
            className="absolute top-[60px] left-0"
            width={totalWidth}
            height={SVG_HEIGHT}
            viewBox={`0 0 ${totalWidth} ${SVG_HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Glow layer */}
            <motion.path
              d={d}
              stroke="rgba(31, 81, 255, 0.3)"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              filter="url(#waveGlow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Main visible line */}
            <motion.path
              d={d}
              stroke="rgba(148, 163, 184, 0.5)"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Glow filter */}
            <defs>
              <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* ΓöÇΓöÇ Nodes + Labels ΓöÇΓöÇ */}
          {steps.map((step, i) => {
            const pt = points[i];
            const isBottom = i % 2 === 0; // 1,3,5 are at bottom troughs
            const { Icon } = step;

            // Icon sits exactly ON the wave point
            // Text sits on the OPPOSITE side
            const svgTopOffset = 60; // matches the SVG's top-[60px]
            const iconCenterY = pt.y + svgTopOffset;

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: pt.x,
                  top: 0,
                  width: 0,
                  height: '100%',
                }}
              >
                {/* White circle icon ΓÇö centered exactly on the wave point */}
                <motion.div
                  className="absolute z-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                  style={{
                    width: NODE_RADIUS * 2,
                    height: NODE_RADIUS * 2,
                    left: -NODE_RADIUS,
                    top: iconCenterY - NODE_RADIUS,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Icon className="w-7 h-7 text-gray-800" strokeWidth={1.8} />
                </motion.div>

                {/* Text block ΓÇö on the OPPOSITE side from where the wave curves */}
                <motion.div
                  className="absolute flex flex-col items-center text-center w-72"
                  style={{
                    left: -144, // w-72 = 288px, so -144 centres it
                    ...(isBottom
                      ? {
                          // Bottom nodes: text goes ABOVE
                          bottom: `calc(100% - ${iconCenterY - NODE_RADIUS - TEXT_GAP}px)`,
                        }
                      : {
                          // Top nodes: text goes BELOW
                          top: iconCenterY + NODE_RADIUS + TEXT_GAP,
                        }),
                  }}
                  initial={{ opacity: 0, y: isBottom ? 20 : -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.1 }}
                >
                  <span className="text-5xl font-heading font-black text-[#1F51FF] drop-shadow-[0_0_20px_rgba(31,81,255,0.6)] mb-2">
                    {step.number}
                  </span>
                  <BorderGlow
                    className="w-full"
                    backgroundColor="transparent"
                    borderRadius={16}
                    glowColor="0 0 100"
                    glowRadius={30}
                    glowIntensity={1}
                    edgeSensitivity={20}
                    fillOpacity={0}
                    colors={['#1F51FF', '#22d3ee', '#1F51FF']}
                  >
                    <div className="glass-card p-5 w-full flex flex-col justify-center bg-black/40 h-full" style={{ border: 'none', borderRadius: 'inherit' }}>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-cyber-silver leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </BorderGlow>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
