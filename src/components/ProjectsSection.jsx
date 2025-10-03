import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = ({ isDark }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with React and Node.js",
      fullDescription: "A comprehensive e-commerce platform featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with React, Node.js, MongoDB, and Stripe integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "🛒",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      title: "AI Dashboard",
      description: "Data visualization dashboard with machine learning insights",
      fullDescription: "An advanced analytics dashboard that leverages machine learning algorithms to provide actionable insights. Features real-time data processing, interactive charts, and predictive analytics.",
      tech: ["Vue.js", "Python", "TensorFlow", "D3.js"],
      image: "🤖",
      color: "from-green-500 to-blue-500"
    },
    {
      id: 3,
      title: "Social Media App",
      description: "Real-time social platform with advanced features",
      fullDescription: "A feature-rich social media application with real-time messaging, story sharing, and advanced privacy controls. Built with modern web technologies and optimized for performance.",
      tech: ["React Native", "Firebase", "Socket.io", "Redux"],
      image: "📱",
      color: "from-pink-500 to-red-500"
    },
    {
      id: 4,
      title: "Blockchain Wallet",
      description: "Secure cryptocurrency wallet with DeFi integration",
      fullDescription: "A secure and user-friendly cryptocurrency wallet supporting multiple blockchains. Features DeFi integration, staking capabilities, and advanced security measures.",
      tech: ["Web3.js", "Solidity", "React", "MetaMask"],
      image: "₿",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      title: "IoT Monitoring",
      description: "Real-time IoT device monitoring and control system",
      fullDescription: "A comprehensive IoT monitoring solution that tracks device performance, manages alerts, and provides remote control capabilities. Supports thousands of concurrent connections.",
      tech: ["Angular", "MQTT", "InfluxDB", "Grafana"],
      image: "🌐",
      color: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    // Horizontal scroll setup
    const scrollWidth = container.scrollWidth - container.clientWidth;
    
    gsap.to(container, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            scale: 0.8,
            opacity: 0.5
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "left 80%",
              end: "right 20%",
              toggleActions: "play reverse play reverse",
              containerAnimation: gsap.getById("horizontal-scroll")
            }
          }
        );
      }
    });

    return () => {
      // Removed global ScrollTrigger kill to prevent unrelated animations from being destroyed
    };
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    gsap.fromTo(".modal-overlay", 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(".modal-content", 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  };

  const closeModal = () => {
    gsap.to(".modal-overlay", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSelectedProject(null)
    });
  };

  return (
    <>
      <section 
        id="projects"
        ref={sectionRef}
        className={`h-screen overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="h-full flex items-center">
          <div 
            ref={containerRef}
            className="flex space-x-8 px-8"
            style={{ width: `${projects.length * 400 + 200}px` }}
          >
            {/* Section Title */}
            <div className="flex-shrink-0 w-96 flex flex-col justify-center">
              <h2 className={`text-6xl md:text-7xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Featured
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Scroll horizontally to explore my latest work
              </p>
            </div>

            {/* Project Cards */}
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => cardsRef.current[index] = el}
                className="flex-shrink-0 w-80 h-96 cursor-pointer group"
                onClick={() => openModal(project)}
                data-cursor="pointer"
              >
                <div className={`h-full rounded-2xl p-8 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105 group-hover:-rotate-1`}>
                  
                  {/* Project Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    {project.image}
                  </div>

                  {/* Project Info */}
                  <h3 className={`text-2xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>

                  <p className={`text-base mb-6 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  } line-clamp-3`}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-gray-700 text-purple-400' : 'bg-purple-100 text-purple-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View More */}
                  <div className={`text-sm font-semibold ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  } group-hover:translate-x-2 transition-transform duration-300`}>
                    View Details →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="modal-overlay fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className={`modal-content max-w-2xl w-full rounded-2xl p-8 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } max-h-[80vh] overflow-y-auto`}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full ${
                isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              } flex items-center justify-center hover:scale-110 transition-transform`}
              data-cursor="pointer"
            >
              ✕
            </button>

            {/* Project Details */}
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${selectedProject.color} flex items-center justify-center text-3xl mb-6`}>
              {selectedProject.image}
            </div>

            <h3 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {selectedProject.title}
            </h3>

            <p className={`text-lg mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } leading-relaxed`}>
              {selectedProject.fullDescription}
            </p>

            {/* Full Tech Stack */}
            <div className="mb-8">
              <h4 className={`text-lg font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span 
                    key={tech}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isDark ? 'bg-gray-700 text-purple-400' : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                data-cursor="pointer"
              >
                View Live Demo
              </button>
              <button 
                className={`px-6 py-3 border-2 ${
                  isDark ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                } rounded-full font-semibold transition-all duration-300`}
                data-cursor="pointer"
              >
                View Code
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;