import React, { useState, useEffect } from 'react';
import { userData, highlights } from '../data/mock';
import Hero from './sections/Hero';
import Highlights from './sections/Highlights';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Languages from './sections/Languages';
import About from './sections/About';
import Contact from './sections/Contact';
import Navigation from './Navigation';
import { Toaster } from "./ui/toaster";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'highlights', 'projects', 'skills', 'education', 'certifications', 'languages', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E6EAF2] font-['Inter'] overflow-x-hidden">
      {/* Aurora Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-[#6EE7F9]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-gradient-radial from-[#A78BFA]/15 to-transparent rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-radial from-[#22D3EE]/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation activeSection={activeSection} />
      
      <main className="relative z-10">
        <Hero id="hero" />
        <Highlights id="highlights" data={highlights} />
        <Projects id="projects" data={userData.projects} />
        <Skills id="skills" data={userData.skills} />
        <Education id="education" data={userData.education} />
        <Certifications id="certifications" data={userData.certifications} />
        <Languages id="languages" data={userData.languages_spoken} />
        <About id="about" data={userData.summary} />
        <Contact id="contact" userData={userData} />
      </main>
      
      <Toaster />
    </div>
  );
};

export default Portfolio;