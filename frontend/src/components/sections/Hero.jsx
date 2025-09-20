import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, MapPin, ArrowRight } from 'lucide-react';
import { userData } from '../../data/mock';

const Hero = ({ id }) => {
  const orbitRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (orbitRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        
        orbitRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${Date.now() * 0.01}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-up">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-['Sora'] font-light leading-[1.1] tracking-[-0.02em]">
              Building my foundations in{' '}
              <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">
                AI/ML
              </span>{' '}
              and Software Engineering
            </h1>
            <p className="text-xl text-[#ADB5C2] max-w-lg leading-relaxed">
              I turn algorithms into clean, reliable code and love learning by shipping.
            </p>
          </div>

          {/* Glass ID Card */}
          <div className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] max-w-md">
            <div className="space-y-3">
              <h2 className="text-2xl font-['Sora'] font-medium">{userData.name}</h2>
              <p className="text-[#ADB5C2] text-sm leading-relaxed">{userData.title}</p>
              <div className="flex items-center gap-2 text-[#ADB5C2] text-sm">
                <MapPin size={16} />
                <span>{userData.location}</span>
              </div>
              <div className="flex gap-4 pt-2">
                <a 
                  href={userData.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={userData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="group bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white px-8 py-4 rounded-full font-medium border border-white/22 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 rounded-full font-medium text-[#ADB5C2] bg-white/5 hover:bg-white/10 border border-white/22 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-all duration-300"
            >
              Contact Me
            </button>
            <a
              href={userData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-medium text-[#ADB5C2] bg-white/5 hover:bg-white/10 border border-white/22 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative flex items-center justify-center">
          <div 
            ref={orbitRef}
            className="relative w-80 h-80 animate-spin-slow"
          >
            {/* Orbital Rings */}
            <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
            <div className="absolute inset-8 border border-[#6EE7F9]/30 rounded-full"></div>
            <div className="absolute inset-16 border border-[#A78BFA]/30 rounded-full"></div>
            
            {/* Central Orb */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-radial from-[#22D3EE] to-[#7C3AED] rounded-full shadow-[0_0_50px_rgba(34,211,238,0.5)]"></div>
            
            {/* Floating Particles */}
            <div className="absolute top-4 right-8 w-3 h-3 bg-[#6EE7F9] rounded-full animate-bounce delay-200"></div>
            <div className="absolute bottom-8 left-4 w-2 h-2 bg-[#A78BFA] rounded-full animate-bounce delay-500"></div>
            <div className="absolute top-1/3 right-4 w-1.5 h-1.5 bg-[#22D3EE] rounded-full animate-bounce delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;