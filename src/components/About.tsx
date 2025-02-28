import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Briefcase, Download, ArrowRight, ExternalLink } from 'lucide-react';

const timelineData = [
  // {
  //   year: '2021',
  //   title: 'Frontend Developer',
  //   company: 'StartUp Inc',
  //   type: 'work',
  //   description: 'Developed modern web applications using React',
  // },
  {
    year: 'Aug 2024 - Present',
    title: 'Junior Software Developer',
    company: 'CCG Systems',
    type: 'work',
    description: 'Assisted in developing and maintaining ERP modules with Angular, .NET, and SQL, collaborated with senior developers on debugging and code reviews, and worked with cross-functional teams to gather requirements and deliver solutions.',
  },
  {
    year: 'Feb 2024 - Jul 2024 ',
    title: 'Software Developer Trainee',
    company: 'CCG Systems',
    type: 'work',
    description: 'Assisted in ERP development using Angular, .NET, and SQL, collaborated on debugging, code reviews, and requirement gathering with cross-functional teams.',
  },
  {
    year: 'Jan 2023 - Nov 2023',
    title: 'Full Stack Software Developer Intern',
    type: 'education',
    description: 'Developed an Electronic Document Management System (EDMS) using ASP.NET CORE 6, Angular, Microsoft SQL and Azure',
  },
];

export default function About() {
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const bioRef = useRef(null);

  // Track mouse position for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bioRef.current) {
        const rect = bioRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = 'src/cv/Vision_ShikwambaneCV.pdf'; 
    link.download = 'VisionShikwambane.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 overflow-hidden relative"
    >
      {/* Background with animated pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-indigo-950 z-0">
        <div className="absolute inset-0 pattern-dots pattern-blue-500 pattern-bg-white pattern-opacity-10 pattern-size-4 dark:pattern-bg-gray-900"></div>
      </div>
      
      {/* Animated decoration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-3xl opacity-30 animate-float-slow"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border-4 border-purple-400/30 dark:border-purple-400/20 rounded-full animate-spin-extra-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border-4 border-indigo-400/20 dark:border-indigo-400/10 rounded-full animate-reverse-spin-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-pink-400/20 dark:border-pink-400/10 rounded-lg transform rotate-45 animate-bounce-slow"></div>
      </div>
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with 3D effect */}
        <div className={`text-center mb-20 perspective ${animate ? 'animate-title-reveal' : 'opacity-0'}`}>
          <div className="inline-block relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 blur-lg opacity-50 rounded-xl"></div>
            <h2 className="relative text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400 py-2 px-6">
              About Me
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Bio Card (5 columns width) */}
          <div 
            ref={bioRef}
            className={`lg:col-span-5 ${animate ? 'animate-slide-up' : 'opacity-0'}`} 
            style={{
              perspective: '1000px'
            }}
          >
            {/* 3D Floating Card with Tilt */}
            <div 
              className="relative rounded-3xl transform-gpu transition-transform duration-300 ease-out" 
              style={{
                transform: mousePos.x ? `rotateY(${(mousePos.x / 500 - 0.5) * 10}deg) rotateX(${(mousePos.y / 300 - 0.5) * -10}deg)` : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Glass effect card */}
              <div className="glassmorphism p-8 rounded-3xl relative z-10 transform">
                {/* Animated corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-purple-500 opacity-80"></div>
                  <div className="absolute top-6 left-8 w-2 h-2 rounded-full bg-indigo-400 opacity-60"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-indigo-500 opacity-80"></div>
                  <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-purple-400 opacity-60"></div>
                </div>
                
                {/* Bio content with animated highlight */}
                <div className="relative">
                  <div className="text-reveal-container">
                    <p className="text-2xl text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                      I'm a <span className="font-bold text-purple-600 dark:text-purple-400 relative">
                        passionate full-stack developer
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 dark:bg-purple-400 transform scale-x-0 animate-highlight-text"></span>
                      </span> building scalable web applications and efficient software solutions.
                    </p>
                  </div>
                  
                  <div className="text-reveal-container delay-200">
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                      My journey began with a fascination for technology and problem-solving. I thrive in Agile environments, continuously learning and building real-world applications.
                    </p>
                  </div>
                  
                  {/* Animated Tags */}
                  <div className="flex flex-wrap gap-2 mb-8 text-reveal-container delay-400">
                    {['Full Stack', 'UI/UX', 'Angular', '.NET', 'React'].map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 border border-purple-200 dark:border-purple-800 rounded-full text-purple-700 dark:text-purple-300 animate-tag-reveal"
                        style={{ animationDelay: `${800 + (i * 100)}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CV Button with hover animation */}
                <div className="text-reveal-container delay-600">
                  <button 
                    onClick={handleDownloadCV}
                    className="group w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white text-lg font-semibold rounded-xl hover:shadow-neon overflow-hidden relative"
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 transition-all duration-300 animate-gradient-shift"></div>
                    
                    {/* Button Text Animation */}
                    <div className="relative flex items-center justify-center transition-all duration-500 transform group-hover:translate-y-[-100%]">
                      <Download className="mr-2" size={20} />
                      <span>Download CV</span>
                    </div>
                    
                    {/* Alternate Text on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 transform translate-y-[100%] group-hover:translate-y-0">
                      <ExternalLink className="mr-2" size={20} />
                      <span>View My Resume</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Timeline (7 columns width) */}
          <div className={`lg:col-span-7 relative ${animate ? 'animate-fade-in-delay' : 'opacity-0'}`}>
            {/* Animated timeline track */}
            <div className="absolute left-[26px] top-8 bottom-8 w-1.5 bg-gradient-to-b from-purple-600 via-indigo-600 to-purple-400 rounded-full">
              <div className="h-full w-full animate-timeline-pulse"></div>
            </div>
            
            {/* Timeline Items */}
            <div className="relative z-10 space-y-16">
              {timelineData.map((item, index) => (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ 
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
                    transitionDelay: `${0.4 + (index * 0.2)}s`
                  }}
                >
                  <div className="relative flex ml-3">
                    {/* Timeline Node with pulsing animation */}
                    <div className="absolute -left-3 mt-1">
                      <div className="relative flex items-center justify-center">
                        {/* Outer ping animation */}
                        <span className={`animate-ping-outer absolute w-16 h-16 rounded-full ${hovered === index ? 'bg-purple-400 opacity-20' : 'opacity-0'} transition-opacity duration-300`}></span>
                        
                        {/* Inner ping animation */}
                        <span className="animate-ping-inner absolute w-12 h-12 rounded-full bg-purple-500 opacity-20"></span>
                        
                        {/* Node circle with icon */}
                        <span className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg border-4 border-white dark:border-gray-800 z-10 transition-transform duration-300 ${hovered === index ? 'scale-110' : ''}`}>
                          {item.type === 'work' ? (
                            <Briefcase size={16} className="text-white" />
                          ) : (
                            <BookOpen size={16} className="text-white" />
                          )}
                        </span>
                      </div>
                    </div>
                    
                    {/* Timeline card - appearing as if connected to the node */}
                    <div className="ml-16 w-full">
                      {/* Card with hover effects */}
                      <div className={`group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl transition-all duration-500 overflow-hidden relative border border-purple-100 dark:border-purple-900/50 ${hovered === index ? 'shadow-purple-500/30 -translate-y-1 scale-[1.02]' : ''}`}>
                        {/* Animated background gradient on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 transform origin-bottom-right transition-transform duration-700 ${hovered === index ? 'scale-100' : 'scale-0'}`}></div>
                        
                        {/* Content with layered reveal animations */}
                        <div className="relative z-10">
                          {/* Year Badge */}
                          <div className="timeline-year">
                            <span className="inline-block px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/50 rounded-full mb-2 backdrop-blur-sm">
                              {item.year}
                            </span>
                          </div>
                          
                          {/* Job Title */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 timeline-title">
                            {item.title}
                          </h3>
                          
                          {/* Company Name */}
                          {item.company && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1 timeline-company">
                              <ArrowRight size={14} className="text-purple-500 mr-1" />
                              <span>{item.company}</span>
                            </div>
                          )}
                          
                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-400 mt-3 timeline-description">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}