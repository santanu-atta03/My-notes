import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import AnimatedNavbar from './components/AnimatedNavbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsTimeline from './components/SkillsTimeline';
import ImageGallery from './components/ImageGallery';
import ThreeDLanding from './components/ThreeDLanding';
import ContactSection from './components/ContactSection';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  
  // Initialize smooth scrolling
  useLenis();

  useEffect(() => {
    // Disable scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    
    // Page entrance animation
    gsap.fromTo('main', 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );
  };

  // Section transition effects
  useEffect(() => {
    if (!isLoading) {
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            gsap.to(section, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            });
          },
          onLeave: () => {
            gsap.to(section, {
              scale: 0.95,
              opacity: 0.8,
              duration: 0.4,
              ease: "power2.out"
            });
          },
          onEnterBack: () => {
            gsap.to(section, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(section, {
              scale: 0.95,
              opacity: 0.8,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);


  // Section transition effects
// Section transition effects
// useEffect(() => {
//   if (!isLoading) {
//     // Wait for all images and content to load
//     const timer = setTimeout(() => {
//       const sections = document.querySelectorAll('section');
      
//       // Force initial visibility
//       sections.forEach(section => {
//         section.style.opacity = '1';
//         section.style.transform = 'scale(1)';
//       });
      
//       // Refresh ScrollTrigger to recalculate positions
//       ScrollTrigger.refresh();
      
//       sections.forEach((section) => {
//         ScrollTrigger.create({
//           trigger: section,
//           start: "top 60%",
//           end: "bottom 40%",
//           onEnter: () => {
//             gsap.to(section, {
//               scale: 1,
//               opacity: 1,
//               duration: 0.6,
//               ease: "power2.out"
//             });
//           },
//           onLeave: () => {
//             gsap.to(section, {
//               scale: 0.98,
//               opacity: 0.9,
//               duration: 0.4,
//               ease: "power2.out"
//             });
//           },
//           onEnterBack: () => {
//             gsap.to(section, {
//               scale: 1,
//               opacity: 1,
//               duration: 0.6,
//               ease: "power2.out"
//             });
//           },
//           onLeaveBack: () => {
//             gsap.to(section, {
//               scale: 0.98,
//               opacity: 0.9,
//               duration: 0.4,
//               ease: "power2.out"
//             });
//           }
//         });
//       });
//     }, 100);

//     return () => {
//       clearTimeout(timer);
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }
// }, [isLoading]);

// // Refresh ScrollTrigger on window load
// useEffect(() => {
//   const handleLoad = () => {
//     ScrollTrigger.refresh();
//   };

//   window.addEventListener('load', handleLoad);
  
//   // Also refresh after a delay as fallback
//   const refreshTimer = setTimeout(() => {
//     ScrollTrigger.refresh();
//   }, 500);

//   return () => {
//     window.removeEventListener('load', handleLoad);
//     clearTimeout(refreshTimer);
//   };
// }, []);


  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Navigation */}
      <AnimatedNavbar toggleTheme={toggleTheme} isDark={isDark} />
      
      {/* Main Content */}
      <main className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {/* Hero Section */}
        <HeroSection isDark={isDark} />
        
        {/* 3D Landing Section */}
        <ThreeDLanding isDark={isDark} />
        
        {/* About Section */}
        <AboutSection isDark={isDark} />
        
        {/* Projects Section */}
        <ProjectsSection isDark={isDark} />
        
        {/* Skills Timeline */}
        <SkillsTimeline isDark={isDark} />
        
        {/* Image Gallery */}
        <ImageGallery isDark={isDark} />
        
        {/* Contact Section */}
        <ContactSection isDark={isDark} />
      </main>

      {/* Footer */}
      <footer className={`py-12 text-center border-t ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Santanu
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Crafting digital experiences with passion
              </p>
            </div>
            
            <div className="flex space-x-6">
              {['LinkedIn', 'GitHub', 'Twitter', 'Dribbble'].map((social) => (
                <button
                  key={social}
                  className={`${
                    isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  } transition-colors duration-300`}
                  data-cursor="pointer"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>
          
          <div className={`mt-8 pt-8 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              © 2024 Portfolio. Built with React, GSAP, and Three.js
            </p>
          </div>
        </div>
      </footer>

      {/* Theme Toggle Data Attribute */}
      <div data-theme-toggle style={{ display: 'none' }} />
    </div>
  );
}

export default App;