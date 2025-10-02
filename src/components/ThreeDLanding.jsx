import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Animated 3D Sphere Component
const AnimatedSphere = ({ isDark }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Rotate the sphere
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Animate distortion
      materialRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
      materialRef.current.speed = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          ref={materialRef}
          color={isDark ? "#8B5CF6" : "#A855F7"}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Floating Particles Component
const FloatingParticles = ({ count = 100 }) => {
  const pointsRef = useRef();
  
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    particles[i] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
};

const ThreeDLanding = ({ isDark }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    // Scroll-controlled rotation
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // This will be handled by the 3D scene internally
        canvas.style.transform = `rotateY(${progress * 360}deg)`;
      }
    });

    // Parallax effect for the entire section
    gsap.to(section, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`h-screen flex items-center justify-center relative overflow-hidden ${
        isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-t from-gray-900/50 to-transparent' 
            : 'bg-gradient-to-t from-white/50 to-transparent'
        }`} />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className={`w-full h-full ${
            isDark ? 'bg-purple-400' : 'bg-purple-600'
          }`} style={{
            backgroundImage: `
              linear-gradient(${isDark ? '#8B5CF6' : '#A855F7'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? '#8B5CF6' : '#A855F7'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>
      </div>

      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto px-4">
        
        {/* Left Side - Content */}
        <div className="space-y-8 lg:pr-12">
          <div>
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            } leading-tight`}>
              Interactive
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                3D Experience
              </span>
            </h2>
            <p className={`text-xl md:text-2xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } leading-relaxed max-w-lg`}>
              Immersive web experiences powered by cutting-edge 3D technology and creative coding
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: '🎯', title: 'Interactive Design', desc: 'Engaging user experiences' },
              { icon: '🚀', title: 'Performance Optimized', desc: 'Smooth 60fps animations' },
              { icon: '✨', title: 'Creative Coding', desc: 'Artistic and functional' }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg ${
                  isDark ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                data-cursor="hover"
              >
                <div className="text-2xl">{feature.icon}</div>
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            data-cursor="pointer"
          >
            Explore 3D Projects
          </button>
        </div>

        {/* Right Side - 3D Canvas */}
        <div className="relative h-full min-h-[500px]">
          <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="w-full h-full"
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b6b" />
              <pointLight position={[10, -10, 5]} intensity={0.5} color="#4ecdc4" />

              {/* 3D Objects */}
              <AnimatedSphere isDark={isDark} />
              <FloatingParticles count={50} />

              {/* Controls */}
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>

          {/* Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner Decorations */}
            <div className={`absolute top-4 right-4 w-16 h-16 border-2 ${
              isDark ? 'border-purple-400' : 'border-purple-500'
            } border-dashed rounded-full animate-spin-slow opacity-50`} />
            <div className={`absolute bottom-4 left-4 w-12 h-12 ${
              isDark ? 'bg-pink-400' : 'bg-pink-500'
            } rounded-full opacity-30 animate-pulse`} />
            
            {/* Info Cards */}
            <div className={`absolute top-1/4 left-4 p-3 rounded-lg ${
              isDark ? 'bg-gray-800/80' : 'bg-white/80'
            } backdrop-blur-sm shadow-lg`}>
              <div className={`text-sm font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                WebGL Powered
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Real-time 3D
              </div>
            </div>

            <div className={`absolute bottom-1/4 right-4 p-3 rounded-lg ${
              isDark ? 'bg-gray-800/80' : 'bg-white/80'
            } backdrop-blur-sm shadow-lg`}>
              <div className={`text-sm font-semibold ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                Interactive
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Drag to rotate
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ThreeDLanding;