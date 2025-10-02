import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsTimeline = ({ isDark }) => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  const experiences = [
    {
      year: "2024",
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      description: "Leading a team of 5 developers in building scalable web applications. Implemented microservices architecture and improved system performance by 40%.",
      skills: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
      side: "left"
    },
    {
      year: "2022",
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      description: "Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to create pixel-perfect user interfaces.",
      skills: ["Vue.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
      side: "right"
    },
    {
      year: "2020",
      title: "Frontend Developer",
      company: "Creative Agency Co.",
      description: "Specialized in creating interactive and responsive web experiences. Worked closely with UX designers to implement complex animations and transitions.",
      skills: ["JavaScript", "GSAP", "Three.js", "Webpack", "Sass"],
      side: "left"
    },
    {
      year: "2019",
      title: "Junior Developer",
      company: "StartUp Ventures",
      description: "Started my professional journey building MVPs and prototypes. Learned the fundamentals of software development and agile methodologies.",
      skills: ["HTML", "CSS", "JavaScript", "Git", "Figma"],
      side: "right"
    },
    {
      year: "2018",
      title: "Computer Science Graduate",
      company: "University of Technology",
      description: "Completed Bachelor's degree in Computer Science with focus on web technologies and software engineering principles.",
      skills: ["Algorithms", "Data Structures", "OOP", "Databases", "Software Engineering"],
      side: "left"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;

    if (!section || !timeline) return;

    // Pin the section
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false
    });

    // Animate timeline items
    itemRefs.current.forEach((item, index) => {
      if (item) {
        const isLeft = experiences[index].side === 'left';
        
        gsap.fromTo(item,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
            scale: 0.8
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        // Stagger animation for skills
        const skills = item.querySelectorAll('.skill-tag');
        gsap.fromTo(skills,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
    });

    // Animate central timeline line
    gsap.fromTo(timeline,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className={`min-h-screen py-20 ${isDark ? 'bg-gray-800' : 'bg-white'} relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${
          isDark ? 'bg-purple-500' : 'bg-purple-200'
        } rounded-full opacity-5 blur-3xl`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${
          isDark ? 'bg-pink-500' : 'bg-pink-200'
        } rounded-full opacity-5 blur-3xl`} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            A timeline of my professional growth and the technologies I've mastered along the way
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div 
            ref={timelineRef}
            className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
              isDark ? 'bg-gradient-to-b from-purple-400 to-pink-400' : 'bg-gradient-to-b from-purple-500 to-pink-500'
            } origin-top`}
          />

          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`flex items-center ${
                  exp.side === 'left' ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${exp.side === 'left' ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  } shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                    
                    {/* Year Badge */}
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                      isDark ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'
                    }`}>
                      {exp.year}
                    </div>

                    {/* Title & Company */}
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {exp.title}
                    </h3>
                    <h4 className={`text-lg font-medium mb-4 ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {exp.company}
                    </h4>

                    {/* Description */}
                    <p className={`text-base mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    } leading-relaxed`}>
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className={`flex flex-wrap gap-2 ${
                      exp.side === 'left' ? 'justify-end' : 'justify-start'
                    }`}>
                      {exp.skills.map((skill) => (
                        <span 
                          key={skill}
                          className={`skill-tag px-3 py-1 rounded-full text-xs font-medium ${
                            isDark ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-700'
                          } shadow-sm`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="w-2/12 flex justify-center">
                  <div className={`w-6 h-6 rounded-full ${
                    isDark ? 'bg-purple-400' : 'bg-purple-500'
                  } border-4 ${
                    isDark ? 'border-gray-800' : 'border-white'
                  } shadow-lg z-10 relative`}>
                    <div className={`absolute inset-0 rounded-full ${
                      isDark ? 'bg-purple-400' : 'bg-purple-500'
                    } animate-ping opacity-20`} />
                  </div>
                </div>

                {/* Empty Space */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-20 text-center">
          <h3 className={`text-3xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Core Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL', 'Python', 'MongoDB', 'Vue.js', 'Next.js', 'PostgreSQL', 'Redis'].map((tech) => (
              <div 
                key={tech}
                className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700 text-purple-400' : 'bg-purple-50 text-purple-600'
                } font-semibold text-center hover:scale-110 transition-transform duration-300 cursor-pointer`}
                data-cursor="hover"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsTimeline;