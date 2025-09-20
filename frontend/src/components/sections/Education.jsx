import React from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const Education = ({ id, data }) => {
  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            Academic <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            Building strong foundations in software engineering and computer science
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {data.map((edu, index) => (
            <div
              key={index}
              className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-white/12 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={32} className="text-white" />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-['Sora'] font-medium text-[#E6EAF2] mb-2">
                      {edu.program}
                    </h3>
                    <p className="text-xl text-[#ADB5C2] mb-1">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-[#ADB5C2] text-sm">
                      <Calendar size={14} />
                      <span>{edu.dates}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-[#E6EAF2]">Key Focus Areas:</h4>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="flex items-start gap-3 text-[#ADB5C2]"
                        >
                          <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;