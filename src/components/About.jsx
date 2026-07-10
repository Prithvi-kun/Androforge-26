import BorderGlow from './BorderGlow';
import aboutImg from '@assets/Logo_Edited.png';

export default function About() {
  return (
    <section id="about" className="w-full min-h-screen max-w-7xl mx-auto px-4 pointer-events-none flex flex-col items-center justify-center">
      <div className="w-full pointer-events-none">
        <BorderGlow
          className="pointer-events-auto w-full"
          backgroundColor="transparent"
          borderRadius={24}
          glowColor="0 0 100"
          glowRadius={45}
          glowIntensity={1.5}
          edgeSensitivity={35}
          fillOpacity={0}
          colors={['#ffffff', '#ffffff', '#ffffff']}
        >
          <div className="glass-card p-6 md:p-8 min-h-[500px] flex flex-col md:flex-row gap-8 w-full h-full" style={{ border: 'none', borderRadius: 'inherit' }}>
            {/* Left side: Image occupying ~1/3 of the space (similar to first column) */}
            <div className="w-full md:w-1/3 h-64 md:h-auto rounded-xl overflow-hidden relative border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <img
                src={aboutImg}
                alt="Androforge Effects"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side: Smaller box for description */}
            <div className="w-full md:w-2/3 flex items-center justify-center">
              <div
                className="glass-card p-8 md:p-12 w-full h-full flex flex-col justify-center rounded-xl bg-white/5 border border-white/10 relative overflow-hidden"
                style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none', background: 'rgba(255, 255, 255, 0.05)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 to-transparent pointer-events-none" />
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 relative z-10">
                  About AndroForge
                </h3>
                <p className="text-cyber-silver text-lg leading-relaxed mb-6 relative z-10">
                  AndroForge is a 24-hour hackathon conducted by AndroPedia club of SRM Ramapuram, organised by the department of Computer Science and Engineering.
                </p>
                <p className="text-cyber-silver text-lg leading-relaxed relative z-10">
                  Join hundreds of developers, designers, and creators to push the boundaries of technology. Whether you're building next-gen AI models, crafting seamless user experiences, or exploring the depths of Web3, Androforge is your platform to shine.
                </p>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
