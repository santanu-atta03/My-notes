import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageGallery = ({ isDark }) => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const imageRefs = useRef([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      title: "Modern Web Design",
      category: "UI/UX",
      description: "Clean and modern interface design for a SaaS platform",
      image: "🎨",
      color: "from-blue-400 to-purple-500",
      size: "large"
    },
    {
      id: 2,
      title: "Mobile App Interface",
      category: "Mobile",
      description: "Intuitive mobile app design with smooth animations",
      image: "📱",
      color: "from-green-400 to-blue-500",
      size: "medium"
    },
    {
      id: 3,
      title: "E-commerce Platform",
      category: "Web",
      description: "Complete e-commerce solution with modern checkout flow",
      image: "🛍️",
      color: "from-pink-400 to-red-500",
      size: "medium"
    },
    {
      id: 4,
      title: "Dashboard Analytics",
      category: "Data Viz",
      description: "Interactive dashboard with real-time data visualization",
      image: "📊",
      color: "from-yellow-400 to-orange-500",
      size: "large"
    },
    {
      id: 5,
      title: "Brand Identity",
      category: "Branding",
      description: "Complete brand identity design for tech startup",
      image: "🎯",
      color: "from-purple-400 to-pink-500",
      size: "small"
    },
    {
      id: 6,
      title: "3D Visualization",
      category: "3D",
      description: "Interactive 3D product visualization",
      image: "🎲",
      color: "from-indigo-400 to-purple-500",
      size: "medium"
    },
    {
      id: 7,
      title: "Landing Page",
      category: "Web",
      description: "High-converting landing page with animations",
      image: "🚀",
      color: "from-cyan-400 to-blue-500",
      size: "small"
    },
    {
      id: 8,
      title: "AR Experience",
      category: "AR/VR",
      description: "Augmented reality shopping experience",
      image: "🥽",
      color: "from-emerald-400 to-cyan-500",
      size: "large"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;
    
    // Masonry layout animation
    imageRefs.current.forEach((image, index) => {
      if (image) {
        gsap.fromTo(image,
          {
            scale: 0,
            opacity: 0,
            rotationY: 90
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: image,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse"
            },
            delay: index * 0.1
          }
        );

        // Hover animation
        const handleMouseEnter = () => {
          gsap.to(image, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(image, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        image.addEventListener('mouseenter', handleMouseEnter);
        image.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          image.removeEventListener('mouseenter', handleMouseEnter);
          image.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    gsap.fromTo(".gallery-modal-overlay", 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(".gallery-modal-content", 
      { scale: 0.5, opacity: 0, rotationY: 90 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 0.6, ease: "back.out(1.7)" }
    );
  };

  const closeModal = () => {
    gsap.to(".gallery-modal-overlay", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSelectedImage(null)
    });
  };

  const getGridItemClass = (size) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-1 row-span-2';
      case 'small':
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <>
      <section 
        id="gallery"
        ref={sectionRef}
        className={`py-20 ${isDark ? 'bg-gray-100' : 'bg-gray-50'} relative overflow-hidden`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 ${
                isDark ? 'bg-purple-400' : 'bg-purple-300'
              } rounded-full opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Creative <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              A showcase of my creative work across different mediums and platforms
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'UI/UX', 'Web', 'Mobile', 'Branding', '3D', 'AR/VR'].map((filter) => (
              <button
                key={filter}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white' 
                    : 'bg-white text-gray-600 hover:bg-purple-600 hover:text-white'
                } shadow-lg hover:shadow-xl transform hover:scale-105`}
                data-cursor="pointer"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div 
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                ref={el => imageRefs.current[index] = el}
                className={`${getGridItemClass(image.size)} cursor-pointer group`}
                onClick={() => openModal(image)}
                data-cursor="pointer"
              >
                <div className={`h-full rounded-2xl overflow-hidden ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-lg hover:shadow-2xl transition-all duration-500 relative`}>
                  
                  {/* Image Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${image.color} opacity-90`} />
                  
                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between text-white">
                    {/* Icon */}
                    <div className="text-4xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {image.image}
                    </div>

                    {/* Info */}
                    <div>
                      <div className="text-xs font-semibold opacity-80 mb-2 uppercase tracking-wider">
                        {image.category}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-2">
                        {image.title}
                      </h3>
                      <p className="text-sm opacity-90 line-clamp-2">
                        {image.description}
                      </p>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.2;
            }
            50% { 
              transform: translateY(-10px) rotate(180deg); 
              opacity: 0.4;
            }
          }
        `}</style>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="gallery-modal-overlay fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className={`gallery-modal-content max-w-4xl w-full rounded-2xl overflow-hidden ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-2xl`}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              data-cursor="pointer"
            >
              ✕
            </button>

            {/* Image Section */}
            <div className={`h-64 md:h-96 bg-gradient-to-br ${selectedImage.color} flex items-center justify-center text-white relative`}>
              <div className="text-8xl md:text-9xl">
                {selectedImage.image}
              </div>
              <div className="absolute bottom-4 left-6">
                <div className="text-sm font-semibold opacity-80 mb-1 uppercase tracking-wider">
                  {selectedImage.category}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {selectedImage.title}
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <p className={`text-lg mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              } leading-relaxed`}>
                {selectedImage.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  data-cursor="pointer"
                >
                  View Project
                </button>
                <button 
                  className={`px-6 py-3 border-2 ${
                    isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-600 hover:text-white'
                  } rounded-full font-semibold transition-all duration-300`}
                  data-cursor="pointer"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;