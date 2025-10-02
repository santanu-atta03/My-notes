import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    // Initial setup
    gsap.set([logoRef.current, progressRef.current, percentRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate in
    tl.to([logoRef.current, progressRef.current, percentRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })
    // Progress bar animation
    .to(progressRef.current, {
      scaleX: 1,
      duration: 2,
      ease: "power2.inOut"
    }, "-=0.5")
    // Counter animation
    .to({ value: 0 }, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: function() {
        if (percentRef.current) {
          percentRef.current.textContent = Math.round(this.targets()[0].value) + '%';
        }
      }
    }, "-=2")
    // Animate out
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    }, "+=0.5")
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power3.inOut"
    }, "-=0.4");

  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div ref={logoRef} className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
          PORTFOLIO
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
      </div>

      {/* Progress Bar */}
      <div className="w-80 mb-6">
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full origin-left scale-x-0"
          ></div>
        </div>
      </div>

      {/* Percentage */}
      <div ref={percentRef} className="text-white text-xl font-light tracking-widest">
        0%
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;