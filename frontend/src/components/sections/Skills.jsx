import React from 'react';
import { Code2, Brain, Wrench } from 'lucide-react';

const Skills = ({ id, data }) => {
  const skillGroups = [
    {
      label: 'Programming',
      items: data.programming,
      icon: Code2,
      gradient: 'from-[#6EE7F9] to-[#22D3EE]'
    },
    {
      label: 'ML & Data',
      items: [...data.ml_libs, ...data.concepts],
      icon: Brain,
      gradient: 'from-[#A78BFA] to-[#7C3AED]'
    },
    {
      label: 'Tooling',
      items: data.tooling,
      icon: Wrench,
      gradient: 'from-[#22D3EE] to-[#6EE7F9]'
    }
  ];

  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            Technical <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            Technologies and concepts I work with to build meaningful solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <div
                key={groupIndex}
                className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-white/12 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${group.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-['Sora'] font-medium text-[#E6EAF2]">
                    {group.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm text-[#E6EAF2] border border-white/20 hover:bg-white/15 hover:scale-103 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;