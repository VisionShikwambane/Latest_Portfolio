import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactDOM from 'react-dom';

/* ------------------------------
   Example Project Data 
------------------------------ */
const projects = [
  {
    title: 'Automated Invoicing Solution',
    description: 'A streamlined invoicing solution built with Angular and ASP.NET Core that automates billing, tracks payments, and sends timely reminders for efficient financial management.',
    images: [
      'https://i.pinimg.com/736x/ed/76/23/ed76238ff16477fd927dcc34ce86f2cb.jpg',
      'https://i.pinimg.com/736x/97/ce/a3/97cea352d8072d1132dcc5bca153f7b5.jpg',
      'https://i.pinimg.com/736x/23/f5/5c/23f55cb313686e25c487b598dccf2f0a.jpg',
      'https://i.pinimg.com/736x/72/3c/77/723c77e31142092da0232839332687c2.jpg',
      'https://i.pinimg.com/736x/dc/bb/15/dcbb15d63342b1a0f54940fc25c04f20.jpg',
      'https://i.pinimg.com/736x/b9/77/6d/b9776d5282d60165b975b07fa347755e.jpg'
    ],
    category: 'Web App',
    technologies: ['Angular', 'Tailwind', 'ASP.NET Core Web API', 'MySQL','Amazon SES'],
    github: 'https://github.com/VisionShikwambane/InvoiceFlow.git',
   
  },
  
  // {
  //   title: 'Task Management App',
  //   description: 'A beautiful and intuitive task management application',
  //   images: [
  //     'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  //   ],
  //   category: 'Web App',
  //   technologies: ['React', 'Firebase', 'Tailwind CSS'],
  //   github: 'https://github.com',
   
  // },
  // {
  //   title: 'Portfolio Website',
  //   description: 'A modern portfolio website with dark mode support',
  //   images: [
  //     'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  //   ],
  //   category: 'UI Design',
  //   technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
  //   github: 'https://github.com',
   
  // },
  // {
  //   title: 'Weather Dashboard',
  //   description: 'A weather dashboard with beautiful visualizations',
  //   images: [
  //     'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1530563885674-66db50a1af19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  //     'https://images.unsplash.com/photo-1598965914211-6ee311be1d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  //   ],
  //   category: 'Data Viz',
  //   technologies: ['React', 'D3.js', 'OpenWeather API'],
  //   github: 'https://github.com',
    
  // },
];

const categories = ['All'];

/* ------------------------------
   Utilities / Helpers
------------------------------ */

/**
 * Splits a text into words or letters, wrapping each in a <span> with a delay
 * Used for the heading "My Projects" to make it rise letter by letter.
 */
function createAnimatedText(text) {
  // Could split by letters or words. Here we do letters for more dramatic effect:
  return [...text].map((char, i) => {
    // Add a small random or incremental delay to each letter
    const delay = 0.05 * i;
    // Non-breakable space for actual spaces
    const displayChar = char === ' ' ? '\u00A0' : char;
    return (
      <span key={i} style={{ animationDelay: `${delay}s` }}>
        {displayChar}
      </span>
    );
  });
}

/* ------------------------------
   Image Carousel Component 
------------------------------ */


const ProjectImageCarousel = ({ images, autoplay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let interval;
    if (autoplay && !isExpanded) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoplay, images.length, isExpanded]);

  // Handle keyboard for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isExpanded) setIsExpanded(false);
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    if (isExpanded) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const ExpandedView = () => {
    const modalContainer = document.createElement('div');
  
    useEffect(() => {
      document.body.appendChild(modalContainer);
      return () => document.body.removeChild(modalContainer);
    }, []);
  
    return ReactDOM.createPortal(
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setIsExpanded(false)}
      >
        <div 
          onClick={e => e.stopPropagation()} 
          style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsExpanded(false)}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {/* Carousel container with transition */}
          <div
            className="flex transition-transform duration-500"  // <- Using Tailwind
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(-${(100 / images.length) * currentIndex}%)`,
            }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                style={{ 
                  width: `${100 / images.length}%`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20
                }}
              >
                <img
                  src={image}
                  alt={`Expanded view ${index + 1}`}
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            style={{
              position: 'absolute',
              left: -1,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            style={{
              position: 'absolute',
              right: -1,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Image counter */}
          <div style={{
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '5px 15px',
            borderRadius: 20,
            fontSize: 14
          }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>,
      modalContainer
    );
  };
  

  return (
    <div className="relative overflow-hidden rounded-t-xl h-60 md:h-64 group">
      {/* Image carousel */}
      <div
        className="h-full w-full flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="h-full min-w-full relative">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
              onClick={() => setIsExpanded(true)}
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
              {index + 1}/{images.length}
            </div>
          </div>
        ))}
      </div>

      {/* Hover overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <div className="bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 font-medium opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
          Click to expand
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 hidden group-hover:flex items-center justify-center bg-white bg-opacity-80 rounded-full shadow-lg"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 hidden group-hover:flex items-center justify-center bg-white bg-opacity-80 rounded-full shadow-lg"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-white w-4' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Expanded view portal */}
      {isExpanded && <ExpandedView />}
    </div>
  );
};












/* ------------------------------
   Main Projects Section 
------------------------------ */
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [animate, setAnimate] = useState(false);

  // For each project card, we’ll track mouse position for 3D tilt
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, projects.length);
  }, []);

  // Intersection Observer for scroll animation
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Optional: subtle parallax effect for background shapes on scroll
  // You can remove or comment out this effect if you want less overhead.
  const parallaxRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.08}px)`; // adjust speed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter logic
  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  // 3D Tilt Handler
  const handleCardMouseMove = (e, index) => {
    if (!cardRefs.current[index]) return;
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();

    // Calculate relative mouse position [ -0.5 ... +0.5 ]
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    // Multiply by a tilt factor
    const tiltFactor = 10; // degrees
    const rotateX = yPos * tiltFactor * -1;
    const rotateY = xPos * tiltFactor;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleCardMouseLeave = (index) => {
    if (!cardRefs.current[index]) return;
    cardRefs.current[index].style.transform = 'rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 overflow-hidden relative"
    >
      {/* Background + pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950 z-0">
        <div className="absolute inset-0 pattern-dots pattern-blue-500 pattern-bg-white pattern-opacity-10 pattern-size-4 dark:pattern-bg-gray-900"></div>
      </div>

      {/* Floating, blurred shapes with optional parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-float-slow"></div>

        {/* Extra shapes (as in About) */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border-4 border-purple-400/30 dark:border-purple-400/20 rounded-full animate-spin-extra-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border-4 border-indigo-400/20 dark:border-indigo-400/10 rounded-full animate-reverse-spin-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-pink-400/20 dark:border-pink-400/10 rounded-lg transform rotate-45 animate-bounce-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Section Title */}
        <div
          className={`text-center mb-20 perspective ${
            animate ? 'animate-title-reveal' : 'opacity-0'
          }`}
        >
          {/* We animate letters individually for a “rise up” effect */}
          <h2
            className="relative text-7xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 
                       dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400 
                       py-2 px-6 inline-block animate-letters"
          >
            {createAnimatedText('Projects')}
          </h2>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-opacity duration-700 ${
            animate ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2 font-medium rounded-full border border-purple-200 dark:border-purple-800 
                transform transition-all duration-300
                hover:-translate-y-1 hover:shadow-md
                ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-neon scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`
                relative border border-purple-100 dark:border-purple-900/30 rounded-3xl overflow-hidden
                transition-all duration-700 will-change-transform 
                ${
                  animate
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }
                hover:shadow-xl hover:shadow-purple-500/20
                /* We'll do the tilt in JS below */
              `}
              style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
            >
              {/* Image Carousel */}
              <ProjectImageCarousel images={project.images} />

              {/* Glassmorphism card body */}
              <div className="glassmorphism p-6 rounded-b-3xl relative overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/0 to-indigo-100/0 dark:from-purple-900/0 dark:to-indigo-900/0 opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none rounded-b-3xl"></div>

                <div className="relative z-10">
                  {/* Title + Category Label */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {project.title}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                        {project.category}
                      </span>
                    </div>
                    {/* Quick Links */}
                    <div className="flex space-x-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-sm transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <Github size={16} />
                      </a>
                      {/* <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 shadow-sm transition-colors"
                        aria-label="View live project"
                      >
                        <ExternalLink size={16} />
                      </a> */}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  {/* Technologies Used */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 dark:text-purple-300 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {/* <span>View Project</span>
                    <ChevronRight
                      size={16}
                      className="ml-1 transform hover:translate-x-1 transition-transform duration-200"
                    /> */}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
