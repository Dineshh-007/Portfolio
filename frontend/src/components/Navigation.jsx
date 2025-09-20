import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block">
        <div className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  activeSection === section.id 
                    ? 'text-[#22D3EE]' 
                    : 'text-[#ADB5C2] hover:text-[#E6EAF2]'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-6 right-6 z-50 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-full p-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-white/12 transition-all duration-300"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isOpen && (
          <div className="absolute top-16 right-0 bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] min-w-[200px]">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'text-[#22D3EE] bg-white/5' 
                    : 'text-[#ADB5C2] hover:text-[#E6EAF2] hover:bg-white/5'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] transition-all duration-300"
          style={{
            width: `${((window.scrollY || 0) / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
          }}
        />
      </div>
    </>
  );
};

export default Navigation;