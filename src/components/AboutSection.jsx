import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = ({ isDark }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const paragraphRefs = useRef([]);

  const paragraphs = [
    "I'm a passionate full-stack developer with over 5 years of experience creating digital experiences that matter. My journey began with a curiosity about how things work on the web, and it has evolved into a deep love for crafting beautiful, functional applications.",
    "I specialize in modern web technologies including React, Node.js, and cloud architecture. My approach combines technical expertise with creative problem-solving to deliver solutions that not only work flawlessly but also delight users.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying at the forefront of web development trends.",
    "My goal is to bridge the gap between design and development, creating seamless experiences that tell compelling stories and drive meaningful engagement."
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    // Pin the image while content scrolls
    // ScrollTrigger.create({
    //   trigger: section,
    //   start: "top top",
    //   end: "bottom bottom",
    //   pin: image,
    //   pinSpacing: false
    // });
    // Pin the image while content scrolls
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "bottom bottom",
  pin: image,
  pinSpacing: false,
  anticipatePin: 1
});

    // Animate paragraphs in from the right
    paragraphRefs.current.forEach((paragraph, index) => {
      if (paragraph) {
        gsap.fromTo(paragraph, 
          { 
            x: 100, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Image hover effect
    const handleMouseMove = (e) => {
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(image, {
        rotationX: y / 10,
        rotationY: x / 10,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    image.addEventListener('mousemove', handleMouseMove);
    image.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      image.removeEventListener('mousemove', handleMouseMove);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className={`min-h-screen ${isDark ? 'bg-gray-800' : 'bg-white'} relative`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Pinned Image */}
          <div className="lg:sticky lg:top-20 lg:h-screen flex items-center">
            <div 
              ref={imageRef}
              className="w-full max-w-md mx-auto"
              data-cursor="hover"
            >
              <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                isDark ? 'shadow-purple-500/20' : 'shadow-gray-500/20'
              }`}>
                {/* Profile Image Placeholder */}
                <div className={`aspect-square ${
                  isDark ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-purple-400 to-pink-400'
                } flex items-center justify-center`}>
                  <div className="text-8xl">👨‍💻</div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-xl">✨</span>
                </div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-2xl">🚀</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>5+</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Years</div>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>50+</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Projects</div>
                </div>
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>100%</div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Passion</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Content */}
          <div ref={contentRef} className="lg:py-20">
            <div className="space-y-16">
              <div>
                <h2 className={`text-5xl md:text-6xl font-bold mb-8 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me</span>
                </h2>
              </div>

              {paragraphs.map((paragraph, index) => (
                <div 
                  key={index}
                  ref={el => paragraphRefs.current[index] = el}
                  className="space-y-6"
                >
                  <p className={`text-lg md:text-xl leading-relaxed ${
                    isDark ? 'text-green-300' : 'text-gray-600'
                  }`}>
                    {paragraph}
                  </p>
                  
                  {index === 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                      {['React', 'Node.js', 'TypeScript', 'AWS'].map((tech) => (
                        <div 
                          key={tech}
                          className={`p-3 rounded-lg text-center ${
                            isDark ? 'bg-gray-700 text-purple-400' : 'bg-purple-50 text-purple-600'
                          } font-semibold`}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Call to Action */}
              <div className="pt-8">
                <button 
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                  data-cursor="pointer"
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;