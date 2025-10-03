import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = ({ isDark }) => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const particlesRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const particles = particlesRef.current;

    if (!section || !form || !particles) return;
    

    // Animate form elements
    const formElements = form.querySelectorAll('.form-element');
    gsap.fromTo(formElements,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Animate particles
    const particleElements = particles.querySelectorAll('.particle');
    particleElements.forEach((particle, index) => {
      gsap.to(particle, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.1
      });
    });

    // Mouse follow effect
    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      gsap.to('.mouse-follower', {
        x: x * 50 - 25,
        y: y * 50 - 25,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Removed global ScrollTrigger kill to prevent unrelated animations from being destroyed
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Animate form submission
    gsap.to(formRef.current, {
      scale: 0.95,
      opacity: 0.5,
      duration: 0.3,
      onComplete: () => {
        setIsSubmitted(true);
        
        // Success animation
        gsap.fromTo('.success-message',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );

        // Reset form after delay
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
          gsap.to(formRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.3
          });
        }, 3000);
      }
    });
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className={`min-h-screen py-20 ${isDark ? 'bg-red-800' : 'bg-white'} relative overflow-hidden`}
    >
      {/* Interactive Background */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 overflow-hidden"
      >
        {/* Animated Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`particle absolute w-2 h-2 ${
              isDark ? 'bg-purple-400' : 'bg-purple-300'
            } rounded-full opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Wavy SVG Background */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-64 opacity-10"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <path 
            fill={isDark ? "#8B5CF6" : "#A855F7"}
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate 
              attributeName="d" 
              dur="10s" 
              repeatCount="indefinite"
              values="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>

        {/* Mouse Follower */}
        <div className={`mouse-follower absolute w-32 h-32 ${
          isDark ? 'bg-purple-500' : 'bg-purple-400'
        } rounded-full opacity-10 blur-2xl pointer-events-none`} />

        {/* Geometric Shapes */}
        <div className={`absolute top-20 right-20 w-20 h-20 ${
          isDark ? 'border-purple-400' : 'border-purple-500'
        } border-2 rotate-45 opacity-20`} />
        <div className={`absolute bottom-40 left-20 w-16 h-16 ${
          isDark ? 'bg-pink-400' : 'bg-pink-500'
        } rounded-full opacity-20`} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Let's <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Connect</span>
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Have a project in mind? I'd love to hear about it. Let's create something amazing together.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${
                  isDark ? 'bg-purple-600' : 'bg-purple-100'
                } flex items-center justify-center`}>
                  <span className={`text-xl ${isDark ? 'text-white' : 'text-purple-600'}`}>📧</span>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Email</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>hello@portfolio.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${
                  isDark ? 'bg-purple-600' : 'bg-purple-100'
                } flex items-center justify-center`}>
                  <span className={`text-xl ${isDark ? 'text-white' : 'text-purple-600'}`}>📱</span>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Phone</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${
                  isDark ? 'bg-purple-600' : 'bg-purple-100'
                } flex items-center justify-center`}>
                  <span className={`text-xl ${isDark ? 'text-white' : 'text-purple-600'}`}>📍</span>
                </div>
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Location</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {['LinkedIn', 'GitHub', 'Twitter', 'Dribbble'].map((social) => (
                <button
                  key={social}
                  className={`w-12 h-12 rounded-full ${
                    isDark ? 'bg-gray-700 text-white hover:bg-purple-600' : 'bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white'
                  } flex items-center justify-center transition-all duration-300 transform hover:scale-110`}
                  data-cursor="pointer"
                >
                  {social[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            {!isSubmitted ? (
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className={`p-8 rounded-2xl ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                } shadow-2xl backdrop-blur-sm`}
              >
                <div className="space-y-6">
                  <div className="form-element">
                    <label className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        isDark 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-400' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500'
                      } focus:outline-none transition-colors duration-300`}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-element">
                    <label className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        isDark 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-400' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500'
                      } focus:outline-none transition-colors duration-300`}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-element">
                    <label className={`block text-sm font-semibold mb-2 ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        isDark 
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-400' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-purple-500'
                      } focus:outline-none transition-colors duration-300 resize-none`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <div className="form-element">
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                      data-cursor="pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className={`success-message p-8 rounded-2xl ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              } shadow-2xl text-center`}>
                <div className="text-6xl mb-4">✅</div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Message Sent!
                </h3>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Thank you for reaching out. I'll get back to you soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;