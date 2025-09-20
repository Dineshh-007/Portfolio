import React, { useState } from 'react';
import { Send, Mail, Github, Linkedin, Download } from 'lucide-react';
import { toast } from "../ui/use-toast";

const Contact = ({ id, userData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission - will be replaced with actual backend integration
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDownloadResume = () => {
    // Mock resume download - will be replaced with actual PDF generation
    toast({
      title: "Resume download started",
      description: "Your download will begin shortly.",
    });
  };

  return (
    <section id={id} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-['Sora'] font-light mb-4">
            Let's <span className="bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-[#ADB5C2] text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] rounded-xl flex items-center justify-center">
                <Send size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-['Sora'] font-medium text-[#E6EAF2]">
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#E6EAF2] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#E6EAF2] placeholder-[#ADB5C2] focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E6EAF2] mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#E6EAF2] placeholder-[#ADB5C2] focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#E6EAF2] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#E6EAF2] placeholder-[#ADB5C2] focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white px-8 py-4 rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Links */}
          <div className="space-y-8">
            <div className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#22D3EE] to-[#6EE7F9] rounded-xl flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-['Sora'] font-medium text-[#E6EAF2]">
                  Direct Contact
                </h3>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${userData.email}`}
                  className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Mail size={20} className="text-[#22D3EE]" />
                  <span className="text-[#E6EAF2]">{userData.email}</span>
                </a>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={userData.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Github size={20} className="text-[#22D3EE]" />
                    <span className="text-[#E6EAF2] text-sm">GitHub</span>
                  </a>

                  <a
                    href={userData.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Linkedin size={20} className="text-[#22D3EE]" />
                    <span className="text-[#E6EAF2] text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/8 backdrop-blur-[20px] border border-white/22 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] rounded-xl flex items-center justify-center">
                  <Download size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-['Sora'] font-medium text-[#E6EAF2]">
                  Resume
                </h3>
              </div>

              <button
                onClick={handleDownloadResume}
                className="w-full bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white px-6 py-4 rounded-xl font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-12 border-t border-white/10">
        <div className="text-center">
          <p className="text-[#ADB5C2] mb-4">
            © 2025 {userData.name}. Built with passion and powered by curiosity.
          </p>
          <p className="text-[#ADB5C2] text-sm">
            Designed with glassmorphism aesthetics and modern web technologies
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;