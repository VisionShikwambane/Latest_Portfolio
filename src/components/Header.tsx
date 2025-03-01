import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Github, Linkedin, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update header background based on scroll position
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const navItems = ['About', 'Skills', 'Projects', 'Contact'];
  
  // Scroll to section with smooth animation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu if open
      setIsMenuOpen(false);
      
      // Smooth scroll to section
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with animation */}
          <a 
            href="#home" 
            onClick={() => scrollToSection('home')}
            className="relative group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 bg-clip-text text-transparent inline-block">
              Vision
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400 transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <div className="flex rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-1 shadow-inner">
              {navItems.map((item) => {
                const sectionId = item.toLowerCase();
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item}
                    href={`#${sectionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(sectionId);
                    }}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                  >
                    {/* Animated background pill for active item */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 shadow-md"></span>
                    )}
                    <span className="relative">{item}</span>
                  </a>
                );
              })}
            </div>
            
            <div className="flex items-center pl-3 space-x-3">
              {/* Theme Toggle Button with Animation */}
              <button 
                onClick={toggleTheme} 
                className="relative p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-inner overflow-hidden transition-all duration-300 hover:shadow-md hover:bg-white dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                <div className="relative z-10">
                  {isDark ? 
                    <Sun className="w-5 h-5 text-amber-400 transform transition-transform duration-300 hover:rotate-45" /> : 
                    <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-300 hover:rotate-12" />
                  }
                </div>
                <span className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-orange-100 to-amber-50' : 'from-indigo-100 to-purple-50'} opacity-0 hover:opacity-100 transition-opacity duration-300`}></span>
              </button>
              
              {/* Social Links with Hover Effects */}
              <div className="flex space-x-1">
                <a 
                  href="https://github.com/VisionShikwambane" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-inner text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:shadow-md hover:bg-white dark:hover:bg-gray-800 transform hover:-translate-y-1"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/vision-shikwambane/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-inner text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:shadow-md hover:bg-white dark:hover:bg-gray-800 transform hover:-translate-y-1"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </nav>

          {/* Animated Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative p-2 rounded-full bg-white/50 dark:bg-gray-800/50 shadow-inner hover:shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'} w-5 h-0.5 absolute`}></span>
              <span className={`bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'} w-5 h-0.5 absolute`}></span>
              <span className={`bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'} w-5 h-0.5 absolute`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation with Animation */}
        <div 
          className={`md:hidden absolute left-0 right-0 top-full transition-all duration-300 transform origin-top ${
            isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
        >
          <div className="mt-2 py-3 px-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg rounded-xl mx-4">
            {navItems.map((item, index) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              
              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 dark:from-purple-600/20 dark:to-indigo-600/20 text-purple-600 dark:text-purple-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-10px)'
                  }}
                >
                  <span className={`${isActive ? 'text-purple-600 dark:text-purple-400 font-medium' : ''}`}>{item}</span>
                  {isActive && (
                    <ChevronDown className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-bounce" />
                  )}
                </a>
              );
            })}
            
            {/* Theme toggle in mobile menu */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 mt-2 border-t border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              style={{ 
                transitionDelay: `${navItems.length * 50}ms`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-10px)' 
              }}
            >
              <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
              {isDark ? 
                <Sun className="w-5 h-5 text-amber-500" /> : 
                <Moon className="w-5 h-5 text-indigo-600" />
              }
            </button>
            
            {/* Social links in mobile menu */}
            <div 
              className="flex justify-center space-x-4 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800"
              style={{ 
                transitionDelay: `${(navItems.length + 1) * 50}ms`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(10px)' 
              }}
            >
              <a 
                href="https://github.com/VisionShikwambane" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/vision-shikwambane/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}