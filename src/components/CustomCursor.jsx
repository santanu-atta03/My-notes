import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursor || !cursorDot || !cursorOutline) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const moveCursor = (e) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDot, cursorOutline], {
        scale: 2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDot, cursorOutline], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleLinkEnter = () => {
      gsap.to(cursorDot, {
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(cursorOutline, {
        scale: 3,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleLinkLeave = () => {
      gsap.to([cursorDot, cursorOutline], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Event listeners
    document.addEventListener('mousemove', moveCursor);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    const hoverElements = document.querySelectorAll('[data-cursor="hover"]');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', moveCursor);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });

      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="pointer-events-none fixed inset-0 z-50 hidden lg:block">
      <div
        ref={cursorDotRef}
        className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={cursorOutlineRef}
        className="absolute w-8 h-8 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </div>
  );
};

export default CustomCursor;