import React from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const Certifications = ({ id, data }) => {
  const getIssuerLogo = (issuer) => {
    // Mock logos for demo - in real implementation, these would be actual logo URLs
    const logos = {
      'DeepLearning.AI': '🤖',
      'HackerRank': '💻',
      'University of Michigan (Coursera)': '🎓'
    };
    return logos[issuer] || '📜';
  };

  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            Professional <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            Validated skills and knowledge through industry-recognized certifications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.map((cert, index) => (
            <div
              key={index}
              className="group bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-white/12 transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {getIssuerLogo(cert.issuer)}
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-['Sora'] font-medium text-[#E6EAF2] leading-tight group-hover:text-[#22D3EE] transition-colors duration-300">
                      {cert.name}
                    </h3>
                    <p className="text-[#ADB5C2] font-medium">{cert.issuer}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[#ADB5C2] text-sm">
                    <Calendar size={14} />
                    <span>Issued {cert.issued}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-2 h-2 bg-[#22D3EE] rounded-full"></div>
                    <span className="text-[#22D3EE] text-sm font-medium">Verified</span>
                  </div>
                </div>

                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 opacity-0 group-hover:opacity-100">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;