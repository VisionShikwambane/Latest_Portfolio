import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const typedTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textArray = ["Frontend Developer", "UI/UX Designer", "Problem Solver"];
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
      if (!typedTextRef.current || !cursorRef.current) return;
      
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextRef.current.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(erase, 2000);
      }
    }

    function erase() {
      if (!typedTextRef.current || !cursorRef.current) return;
      
      if (charIndex > 0) {
        typedTextRef.current.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, 500);
      }
    }

    setTimeout(type, 1000);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white shadow-lg"
          />
          
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            John Doe
          </h1>
          
          <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            I am a <span ref={typedTextRef} className="text-purple-600 dark:text-purple-400"></span>
            <span ref={cursorRef} className="animate-pulse">|</span>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Building modern digital experiences with a passion for clean code and pixel-perfect design.
          </p>
          
          <div className="flex justify-center space-x-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </section>
  );
}