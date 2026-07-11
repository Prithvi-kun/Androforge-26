import { useEffect } from 'react';
import Venue from '../components/Venue';
import FloatingNav from '../components/FloatingNav';
import Galaxy from '../components/Galaxy';
import Timeline from '../components/Timeline';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'instant' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Galaxy 
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.05}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.2}
          speed={0.6}
        />
      </div>
      <main className="w-full min-h-screen relative pointer-events-none flex flex-col items-center pb-32">
        <div className="relative z-10 w-full flex flex-col gap-16">
          <Timeline />
          <Venue />
          <FAQ />
        </div>
      </main>

      <Footer />

      {/* Floating Bottom Navigation */}
      <FloatingNav />
    </>
  );
}
