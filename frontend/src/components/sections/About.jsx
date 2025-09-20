import React from 'react';
import { User, Target, Heart } from 'lucide-react';

const About = ({ id, data }) => {
  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            About <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            Learn more about my journey, passions, and what drives me in technology
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-8 lg:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] rounded-xl flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-['Sora'] font-medium text-[#E6EAF2]">
                My Story
              </h3>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#ADB5C2] leading-relaxed text-lg mb-6">
                {data}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#22D3EE] to-[#6EE7F9] rounded-lg flex items-center justify-center">
                    <Target size={16} className="text-white" />
                  </div>
                  <h4 className="text-lg font-['Sora'] font-medium text-[#E6EAF2]">Current Focus</h4>
                </div>
                <ul className="space-y-2 text-[#ADB5C2]">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Mastering supervised machine learning techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Strengthening data structures & algorithms foundation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#22D3EE] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Building production-ready applications</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] rounded-lg flex items-center justify-center">
                    <Heart size={16} className="text-white" />
                  </div>
                  <h4 className="text-lg font-['Sora'] font-medium text-[#E6EAF2]">What I Love</h4>
                </div>
                <ul className="space-y-2 text-[#ADB5C2]">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#A78BFA] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Turning complex algorithms into elegant solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#A78BFA] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Collaborative learning and knowledge sharing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#A78BFA] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Optimizing code for clarity and performance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;