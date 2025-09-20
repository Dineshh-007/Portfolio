import React from 'react';
import { Award, Code, Trophy } from 'lucide-react';

const Highlights = ({ id, data }) => {
  const icons = [Award, Trophy, Code];

  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            Key <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Highlights</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            Recent achievements and certifications that showcase my growing expertise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((highlight, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="group bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-white/12 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-['Sora'] font-medium mb-3 text-[#E6EAF2]">
                  {highlight.title}
                </h3>
                <p className="text-[#ADB5C2] leading-relaxed">
                  {highlight.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Highlights;