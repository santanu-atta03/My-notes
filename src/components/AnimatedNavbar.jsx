import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedNavbar = ({ toggleTheme, isDark }) => {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial animation
    gsap.fromTo(nav, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Section highlighting
    navItems.forEach(item => {
      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top 20%",
        end: "bottom 20%",
        onEnter: () => setActiveSection(item.id),
        onEnterBack: () => setActiveSection(item.id)
      });
    });

    return () => {
      // Removed global ScrollTrigger kill to prevent unrelated animations from being destroyed
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isDark ? 'bg-gray-900/90' : 'bg-white/90'
        } backdrop-blur-md border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className={`text-2xl font-bold cursor-pointer ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              onClick={() => scrollToSection('hero')}
              data-cursor="pointer"
            >
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? isDark ? 'text-purple-400' : 'text-purple-600'
                      : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-cursor="pointer"
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
                }`}
                data-cursor="pointer"
              >
                {isDark ? '☀️' : '🌙'}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className={`md:hidden p-2 rounded-md ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
                data-cursor="pointer"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                  <div className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <div className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-16 right-0 w-full h-screen ${
          isDark ? 'bg-gray-900' : 'bg-white'
        } z-20 transform translate-x-full md:hidden`}
      >
        <div className="flex flex-col space-y-4 p-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left py-3 px-4 text-lg font-medium transition-colors duration-200 ${
                activeSection === item.id
                  ? isDark ? 'text-purple-400' : 'text-purple-600'
                  : isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              data-cursor="pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimatedNavbar;