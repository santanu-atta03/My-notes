import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitTextAnimation = ({ 
  children, 
  animation = 'fadeUp', 
  stagger = 0.05, 
  trigger = 'self',
  className = '',
  tag = 'div'
}) => {
  const textRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into characters
    const text = element.textContent;
    element.innerHTML = '';
    
    // Create spans for each character
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
      span.style.display = 'inline-block';
      span.className = 'split-char';
      element.appendChild(span);
      return span;
    });

    charsRef.current = chars;

    // Animation configurations
    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 50, rotationX: 90 },
        to: { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: "back.out(1.7)" }
      },
      fadeIn: {
        from: { opacity: 0, scale: 0 },
        to: { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      },
      slideRight: {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      },
      rotate: {
        from: { opacity: 0, rotation: 180, scale: 0 },
        to: { opacity: 1, rotation: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      },
      wave: {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" }
      },
      glitch: {
        from: { opacity: 0, x: "random(-20, 20)", y: "random(-20, 20)", skewX: "random(-20, 20)" },
        to: { opacity: 1, x: 0, y: 0, skewX: 0, duration: 0.8, ease: "power3.out" }
      }
    };

    const config = animations[animation] || animations.fadeUp;

    // Set initial state
    gsap.set(chars, config.from);

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger === 'self' ? element : trigger,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    });

    tl.to(chars, {
      ...config.to,
      stagger: stagger
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, animation, stagger, trigger]);

  const Tag = tag;

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
};

// Predefined text animation components
export const FadeUpText = ({ children, className = '', tag = 'div', stagger = 0.05 }) => (
  <SplitTextAnimation animation="fadeUp" stagger={stagger} className={className} tag={tag}>
    {children}
  </SplitTextAnimation>
);

export const WaveText = ({ children, className = '', tag = 'div', stagger = 0.1 }) => (
  <SplitTextAnimation animation="wave" stagger={stagger} className={className} tag={tag}>
    {children}
  </SplitTextAnimation>
);

export const GlitchText = ({ children, className = '', tag = 'div', stagger = 0.02 }) => (
  <SplitTextAnimation animation="glitch" stagger={stagger} className={className} tag={tag}>
    {children}
  </SplitTextAnimation>
);

export const RotateText = ({ children, className = '', tag = 'div', stagger = 0.08 }) => (
  <SplitTextAnimation animation="rotate" stagger={stagger} className={className} tag={tag}>
    {children}
  </SplitTextAnimation>
);

// Word-based split text animation
export const SplitWordAnimation = ({ 
  children, 
  animation = 'fadeUp', 
  stagger = 0.1, 
  className = '',
  tag = 'div'
}) => {
  const textRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into words
    const text = element.textContent;
    element.innerHTML = '';
    
    const words = text.split(' ').map((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.marginRight = '0.25em';
      span.className = 'split-word';
      element.appendChild(span);
      return span;
    });

    wordsRef.current = words;

    // Animation configurations for words
    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      },
      slideIn: {
        from: { opacity: 0, x: -30 },
        to: { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      },
      scale: {
        from: { opacity: 0, scale: 0.5 },
        to: { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      }
    };

    const config = animations[animation] || animations.fadeUp;

    // Set initial state
    gsap.set(words, config.from);

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    });

    tl.to(words, {
      ...config.to,
      stagger: stagger
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, animation, stagger]);

  const Tag = tag;

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
};

// Line-based split text animation
export const SplitLineAnimation = ({ 
  children, 
  animation = 'fadeUp', 
  stagger = 0.2, 
  className = '',
  tag = 'div'
}) => {
  const textRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into lines (assuming line breaks or manual splitting)
    const text = element.textContent;
    element.innerHTML = '';
    
    const lines = text.split('\n').filter(line => line.trim()).map((line, index) => {
      const div = document.createElement('div');
      div.textContent = line;
      div.className = 'split-line';
      div.style.overflow = 'hidden';
      
      const span = document.createElement('span');
      span.textContent = line;
      span.style.display = 'inline-block';
      
      div.innerHTML = '';
      div.appendChild(span);
      element.appendChild(div);
      
      return span;
    });

    linesRef.current = lines;

    // Animation configurations for lines
    const animations = {
      fadeUp: {
        from: { opacity: 0, y: '100%' },
        to: { opacity: 1, y: '0%', duration: 1, ease: "power3.out" }
      },
      slideIn: {
        from: { opacity: 0, x: '-100%' },
        to: { opacity: 1, x: '0%', duration: 0.8, ease: "power3.out" }
      }
    };

    const config = animations[animation] || animations.fadeUp;

    // Set initial state
    gsap.set(lines, config.from);

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    });

    tl.to(lines, {
      ...config.to,
      stagger: stagger
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, animation, stagger]);

  const Tag = tag;

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
};

export default SplitTextAnimation;