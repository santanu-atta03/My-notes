import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    // Create a smooth transition animation
    const tl = gsap.timeline();
    
    // Fade out
    tl.to('body', {
      opacity: 0.8,
      duration: 0.2,
      ease: "power2.inOut"
    })
    // Change theme
    .call(() => {
      setIsDark(!isDark);
    })
    // Fade back in
    .to('body', {
      opacity: 1,
      duration: 0.3,
      ease: "power2.inOut"
    });

    // Add a ripple effect from the toggle button
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('div');
      
      ripple.style.position = 'fixed';
      ripple.style.left = rect.left + rect.width / 2 + 'px';
      ripple.style.top = rect.top + rect.height / 2 + 'px';
      ripple.style.width = '0px';
      ripple.style.height = '0px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = isDark ? '#FFF' : '#000';
      ripple.style.opacity = '0.1';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '9999';
      ripple.style.transform = 'translate(-50%, -50%)';
      
      document.body.appendChild(ripple);
      
      gsap.to(ripple, {
        width: '200vmax',
        height: '200vmax',
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          document.body.removeChild(ripple);
        }
      });
    }
  };

  return { isDark, toggleTheme };
};

export default useTheme;