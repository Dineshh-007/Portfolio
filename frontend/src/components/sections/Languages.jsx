import React from 'react';
import { Globe } from 'lucide-react';

const Languages = ({ id, data }) => {
  const getProficiencyColor = (language) => {
    if (language.includes('Native') || language.includes('Full professional')) {
      return 'from-[#22D3EE] to-[#6EE7F9]';
    } else if (language.includes('Professional working')) {
      return 'from-[#A78BFA] to-[#7C3AED]';
    } else {
      return 'from-[#6EE7F9] to-[#A78BFA]';
    }
  };

  const getProficiencyWidth = (language) => {
    if (language.includes('Native') || language.includes('Full professional')) {
      return 'w-full';
    } else if (language.includes('Professional working')) {
      return 'w-4/5';
    } else {
      return 'w-3/5';
    }
  };

  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            Languages <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Spoken</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            Multilingual communication capabilities for global collaboration
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] rounded-xl flex items-center justify-center">
              <Globe size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-['Sora'] font-medium text-[#E6EAF2]">
              Communication Proficiency
            </h3>
          </div>

          <div className="space-y-6">
            {data.map((language, index) => {
              const [lang, proficiency] = language.split(' — ');
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-[#E6EAF2]">{lang}</span>
                    <span className="text-sm text-[#ADB5C2]">{proficiency}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`${getProficiencyWidth(language)} h-2 bg-gradient-to-r ${getProficiencyColor(language)} rounded-full transition-all duration-700 ease-out`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Languages;