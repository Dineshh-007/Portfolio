import React, { useState } from 'react';
import { ExternalLink, Github, Star, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const Projects = ({ id, data }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            Featured <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my journey in AI/ML and software engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((project, index) => (
            <div
              key={index}
              className="group bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-white/12 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-['Sora'] font-medium text-[#E6EAF2] group-hover:text-[#22D3EE] transition-colors duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#ADB5C2] text-sm">
                    <Star size={14} />
                    <span>{project.stars}</span>
                  </div>
                </div>

                <p className="text-[#ADB5C2] text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs text-[#E6EAF2] border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[#ADB5C2] text-xs">
                  <Calendar size={12} />
                  <span>Updated {new Date(project.lastUpdated).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-3 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
                      >
                        View Details
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0B0F19] border border-white/22 backdrop-blur-[20px] text-[#E6EAF2] max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-['Sora'] text-[#E6EAF2]">
                          {selectedProject?.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-[#ADB5C2] leading-relaxed">
                          {selectedProject?.readme}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject?.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 bg-white/10 rounded-full text-xs text-[#E6EAF2] border border-white/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3 pt-4">
                          <a
                            href={selectedProject?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
                          >
                            <Github size={16} />
                            View on GitHub
                          </a>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;