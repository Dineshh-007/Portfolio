import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, Calendar, Loader } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { portfolioAPI } from '../../services/api';
import { userData } from '../../data/mock';

const Projects = ({ id }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getGitHubProjects();
      
      if (response.success && response.projects) {
        setProjects(response.projects);
        setError(null);
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
      // Fallback to mock data
      setProjects(userData.projects);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Recent';
    }
  };

  const getProjectLanguageColor = (language) => {
    const colors = {
      'Python': 'from-[#3776ab] to-[#ffd43b]',
      'JavaScript': 'from-[#f7df1e] to-[#323330]',
      'Java': 'from-[#ed8b00] to-[#f89820]',
      'C++': 'from-[#00599c] to-[#004482]',
      'TypeScript': 'from-[#007acc] to-[#3178c6]',
    };
    return colors[language] || 'from-[#6EE7F9] to-[#A78BFA]';
  };

  if (loading) {
    return (
      <section id={id} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
              Featured <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
              Loading projects from GitHub...
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="flex items-center gap-3 text-[#ADB5C2]">
              <Loader className="animate-spin" size={20} />
              <span>Fetching latest projects...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            Featured <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            {error ? 'Showcasing my development journey' : 'Live projects from my GitHub repository'}
          </p>
          {error && (
            <p className="text-[#A78BFA] text-sm mt-2">
              GitHub API temporarily unavailable - showing featured projects
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.name || index}
              className="group bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:bg-white/12 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-['Sora'] font-medium text-[#E6EAF2] group-hover:text-[#22D3EE] transition-colors duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#ADB5C2] text-sm">
                    <Star size={14} />
                    <span>{project.stars || 0}</span>
                  </div>
                </div>

                <p className="text-[#ADB5C2] text-sm leading-relaxed">
                  {project.description || 'No description available'}
                </p>

                <div className="flex flex-wrap gap-2">
                  {(project.topics || project.tags || []).slice(0, 4).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs text-[#E6EAF2] border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.language && (
                    <span
                      className={`px-3 py-1 bg-gradient-to-r ${getProjectLanguageColor(project.language)} rounded-full text-xs text-white font-medium`}
                    >
                      {project.language}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[#ADB5C2] text-xs">
                  <Calendar size={12} />
                  <span>Updated {formatDate(project.lastUpdated)}</span>
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
                          {selectedProject?.readme || selectedProject?.description || 'No detailed description available.'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(selectedProject?.topics || selectedProject?.tags || []).map((tag, tagIndex) => (
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

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-[#ADB5C2] text-lg">No projects found</p>
            <button
              onClick={fetchProjects}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white rounded-lg hover:scale-105 transition-all duration-300"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;