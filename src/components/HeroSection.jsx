import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ isDark }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const background = backgroundRef.current;

    if (!hero || !title || !subtitle || !scrollIndicator || !background) return;

    // Initial setup
    gsap.set([title, subtitle, scrollIndicator], {
      opacity: 0,
      y: 100
    });

    gsap.set(title, { scale: 0.8 });

    // Main timeline
    const tl = gsap.timeline({ delay: 2.5 }); // Wait for preloader

    tl.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power3.out"
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(scrollIndicator, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");

    // Parallax background
    gsap.to(background, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Title parallax
    gsap.to(title, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Subtitle parallax
    gsap.to(subtitle, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Scroll indicator animation
    gsap.to(scrollIndicator, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    return () => {
      // Removed global ScrollTrigger kill to prevent unrelated animations from being destroyed
    };
  }, []);

  const scrollToNext = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      id="hero"
      ref={heroRef}
      className={`relative h-screen flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`} />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-white' : 'bg-purple-300'
              } opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 ${
            isDark ? 'bg-purple-500' : 'bg-purple-200'
          } rounded-full opacity-10 blur-3xl animate-pulse`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${
            isDark ? 'bg-pink-500' : 'bg-pink-200'
          } rounded-full opacity-10 blur-3xl animate-pulse`} style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className={`text-6xl md:text-8xl lg:text-9xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          } leading-none tracking-tight`}
          data-cursor="hover"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            CREATIVE
          </span>
          <br />
          <span className={isDark ? 'text-white' : 'text-gray-900'}>
            DEVELOPER
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className={`text-xl md:text-2xl lg:text-3xl font-light mb-12 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          } max-w-2xl mx-auto leading-relaxed`}
        >
          Crafting digital experiences with passion, precision, and a touch of magic
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button 
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            data-cursor="pointer"
            onClick={() => scrollToNext()}
          >
            Explore My Work
          </button>
          <button 
            className={`px-8 py-4 border-2 ${
              isDark ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            } rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105`}
            data-cursor="pointer"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
        data-cursor="pointer"
      >
        <div className={`flex flex-col items-center ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="text-sm font-light mb-2 tracking-widest">SCROLL</span>
          <div className={`w-6 h-10 border-2 ${
            isDark ? 'border-white' : 'border-gray-900'
          } rounded-full flex justify-center`}>
            <div className={`w-1 h-3 ${
              isDark ? 'bg-white' : 'bg-gray-900'
            } rounded-full mt-2`} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;