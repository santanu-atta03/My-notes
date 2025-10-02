import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    // Animate progress bar based on scroll
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-40 bg-gray-800">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 origin-left scale-x-0"
      />
    </div>
  );
};

export default ScrollProgress;