import React, { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  
  // Handle mouse movement for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set visibility after component mounts
  useEffect(() => {
    setIsVisible(true);
    
    // Typing animation
    const textArray = [
      "Full Stack Developer", 
      "Problem Solver", 
      "Creative Thinker",
      "Tech Enthusiast",
      "Innovation Expert"
    ];
    
    let textArrayIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    
    function updateText() {
      if (!typedTextRef.current) return;
      
      if (isErasing) {
        // Erase characters with dynamic speed
        charIndex--;
        typedTextRef.current.textContent = textArray[textArrayIndex].substring(0, charIndex);
        
        if (charIndex === 0) {
          isErasing = false;
          textArrayIndex = (textArrayIndex + 1) % textArray.length;
          setTimeout(updateText, 800); // Pause before typing the next word
        } else {
          const erasingSpeed = Math.max(20, Math.min(80, 80 - charIndex * 2));
          setTimeout(updateText, erasingSpeed);
        }
      } else {
        // Type characters with dynamic speed
        charIndex++;
        typedTextRef.current.textContent = textArray[textArrayIndex].substring(0, charIndex);
        
        if (charIndex === textArray[textArrayIndex].length) {
          isErasing = true;
          setTimeout(updateText, 2500); // Pause before erasing
        } else {
          const typingSpeed = Math.max(40, Math.min(120, 80 - charIndex));
          setTimeout(updateText, typingSpeed);
        }
      }
    }
    
    setTimeout(updateText, 1000);
  }, []);

  // Calculate spotlight position
  const spotlightStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.1), transparent 40%)`,
  };

  return (
    <section 
      id="home" 
      className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800 transition-colors duration-500 ${scrolled ? 'bg-opacity-95' : ''}`}
    >
      {/* Interactive spotlight effect that follows cursor */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={spotlightStyle}
      ></div>
      
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl opacity-10 dark:opacity-5 animate-pulse-slow transform rotate-45"></div>
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-10 dark:opacity-5 animate-float-delay"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-pink-400 rounded-full filter blur-3xl opacity-10 dark:opacity-5 animate-float"></div>
        
        {/* SVG wave separator at bottom */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
          <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0,224L60,197.3C120,171,240,117,360,117.3C480,117,600,171,720,186.7C840,203,960,181,1080,154.7C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" 
            fill="rgba(124, 58, 237, 0.05)"></path>
          </svg>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-20">
        <div className={`text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          {/* Profile image with animated glowing effect */}
          <div className="relative mb-10 inline-block group">
            <div className="absolute inset-0 -m-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-full filter blur opacity-40 group-hover:opacity-70 transition-all duration-1000 animate-spin-slow"></div>
            <div className="absolute inset-0 -m-1 bg-white dark:bg-gray-800 rounded-full"></div>
            <img
              src="src/images/1715545135237.jpg"
              alt="Profile"
              className="w-36 h-36 rounded-full relative z-10 transition-transform duration-700 transform group-hover:scale-105 border-4 border-white dark:border-gray-800 shadow-xl"
            />
            
            {/* Status indicator */}
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-400 rounded-full z-20 border-4 border-white dark:border-gray-800 animate-pulse"></div>
          </div>
          
          {/* Name with gradient and reveal animation */}
          <div className="overflow-hidden mb-3">
            <h1 className="text-5xl sm:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 transform transition-transform duration-1000 hover:scale-105 relative inline-block">
               Vision Shikwambane
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </h1>
          </div>
          
          {/* Subtitle with badge */}
          {/* <div className="flex justify-center items-center mb-8 space-x-2 opacity-0 animate-fade-in-delay-1">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">Available for hire</span>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-200">Remote</span>
          </div> */}
          
          {/* Typing animation */}
          <div className="text-xl sm:text-3xl text-gray-700 dark:text-gray-200 mb-8 font-light opacity-0 animate-fade-in-delay-2 h-10">
            I am a <span ref={typedTextRef} className="font-semibold text-purple-600 dark:text-purple-400 inline-block min-w-20"></span>
            <span className="font-light inline-block w-2 h-8 ml-1 bg-purple-600 dark:bg-purple-400 animate-blink"></span>
          </div>
          
          {/* Bio with reveal animation */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light opacity-0 animate-fade-in-delay-3 shadow-text">
            Building modern digital experiences with a passion for clean code, 
            <span className="text-purple-600 dark:text-purple-400 font-medium"> innovative solutions</span>, and 
            <span className="text-indigo-600 dark:text-indigo-400 font-medium"> flawless design</span> execution.
          </p>
          
          {/* CTA buttons with advanced hover effects */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 animate-fade-in-delay-4">
            <a
              href="#projects"
              className="relative px-10 py-4 overflow-hidden rounded-full shadow-lg group bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-2xl transition-all duration-500"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-10"></span>
              <span className="absolute -inset-0 w-10 h-full transform rotate-12 translate-x-10 bg-white opacity-10 group-hover:translate-x-[30rem] transition-transform duration-1000"></span>
              <span className="relative flex items-center justify-center text-white font-medium">
                <span>View My Work</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium text-indigo-600 dark:text-indigo-400 rounded-full border-2 border-indigo-600 dark:border-indigo-400 hover:text-white transition-all duration-300"
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 dark:bg-indigo-500 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="absolute right-0 flex items-center justify-center w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="relative">Contact Me</span>
            </a>
          </div>
          
          {/* Skill badges */}
          <div className="mt-16 opacity-0 animate-fade-in-delay-5">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['C# ASP.NET', 'JavaScript', 'Node.js', 'Java', 'SQL'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 transform transition-transform"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Social media icons with hover effects */}
          <div className="mt-8 flex justify-center space-x-6 opacity-0 animate-fade-in-delay-5">
            {[
              { name: 'https://github.com/VisionShikwambane', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
              { name: 'https://www.linkedin.com/in/vision-shikwambane', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { 
                // The link to your Instagram profile
                name: 'https://www.instagram.com/vision_shikwambane', 
                
                // A common Instagram icon path (from a minimal Heroicons-like shape)
                icon: 'M7 2C4.238 2 2 4.238 2 7v10c0 2.762 2.238 5 5 5h10c2.762 0 5-2.238 5-5V7c0-2.762-2.238-5-5-5H7zM12 17a5 5 0 100-10 5 5 0 000 10zm0-8.571A3.571 3.571 0 1112 15.43a3.571 3.571 0 010-7.142zM17.75 7a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z',
              },
              
            
            ].map((social) => {
              // Decide whether 'social.name' is a full URL or just a handle
              const isFullUrl = social.name.startsWith('http');
              return (
                <a
                  key={social.name}
                  href={isFullUrl ? social.name : `#${social.name}`} 
                  // If it's a real URL, open in new tab
                  target={isFullUrl ? '_blank' : undefined}
                  rel={isFullUrl ? 'noopener noreferrer' : undefined}
                  className="group relative"
                >
                  <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-full transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 shadow-sm group-hover:shadow-md">
                    <svg
                      className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                    </svg>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Fixed bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent opacity-0 animate-fade-in-delay-1"></div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-0 animate-fade-in-delay-6">
        <a
          href="#about"
          className="group flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
        >
          <span className="text-xs font-medium mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">Scroll Down</span>
          <div className="w-8 h-12 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center group-hover:border-purple-500 dark:group-hover:border-purple-400 transition-colors duration-300">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 group-hover:bg-purple-500 dark:group-hover:bg-purple-400 transition-colors duration-300 animate-scroll-down"></div>
          </div>
        </a>
      </div>
    </section>
  );
}