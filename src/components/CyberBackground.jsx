import { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let animationFrameId;
    let isVisible = true;

    // Handle visibility change to pause animation
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.isSquare = Math.random() > 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
        if (this.isSquare) {
          ctx.fillRect(this.x, this.y, this.size, this.size);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    let angle = 0;
    const drawGears = () => {
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.05)';
      ctx.lineWidth = 2;
      
      const drawGear = (x, y, radius, teeth, rotAngle) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotAngle);
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
          const a = (i / teeth) * Math.PI * 2;
          ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
          ctx.lineTo(Math.cos(a + 0.1) * (radius + 10), Math.sin(a + 0.1) * (radius + 10));
          ctx.lineTo(Math.cos(a + 0.2) * (radius + 10), Math.sin(a + 0.2) * (radius + 10));
        }
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(0, 0, radius - 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      };

      drawGear(canvas.width * 0.1, canvas.height * 0.8, 100, 12, angle * 0.01);
      drawGear(canvas.width * 0.9, canvas.height * 0.2, 150, 16, -angle * 0.005);
      drawGear(canvas.width * 0.5, canvas.height * 0.5, 250, 24, angle * 0.002);
      angle++;
    };

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Radial gradient glow at center
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        gradient.addColorStop(0, 'rgba(14, 165, 233, 0.05)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawGears();

        particles.forEach(p => {
          p.update();
          p.draw();
        });
        
        drawLines();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
}
