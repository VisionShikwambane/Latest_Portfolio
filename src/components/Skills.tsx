import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Palette, Terminal, Zap, Star, ChevronRight, ExternalLink, Award } from 'lucide-react';

const skills = {
  frontend: [
    { name: 'React', level: 90 },
    { name: 'Angular', level: 95 },
    { name: 'TypeScript', level: 85 },
    { name: 'CSS/SASS', level: 90 },
    { name: 'Tailwind CSS', level: 95 },
  ],
  backend: [
    { name: 'Node.js', level: 80 },
    { name: 'ASP.NET', level: 96 },
    { name: 'REST APIs', level: 95 },
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'Azure DevOps', level: 75 },
    { name: 'MS Office', level: 70 },
    // { name: 'Jest', level: 80 },
  ],
  soft: [
    { name: 'Microsoft SQL Server (MSSQL)', level: 95 },
    { name: 'MySql', level: 90 },
  ],
};

// Star rating based on skill level
const SkillStars = ({ level }) => {
  if (level >= 95) return (
    <div className="flex">
      <Star size={12} className="text-yellow-500 fill-yellow-500" />
      <Star size={12} className="text-yellow-500 fill-yellow-500 -ml-0.5" />
      <Star size={12} className="text-yellow-500 fill-yellow-500 -ml-0.5" />
    </div>
  );
  if (level >= 85) return (
    <div className="flex">
      <Star size={12} className="text-yellow-500 fill-yellow-500" />
      <Star size={12} className="text-yellow-500 fill-yellow-500 -ml-0.5" />
      <Star size={12} className="text-yellow-500 fill-yellow-500/50 -ml-0.5" />
    </div>
  );
  if (level >= 75) return (
    <div className="flex">
      <Star size={12} className="text-yellow-500 fill-yellow-500" />
      <Star size={12} className="text-yellow-500 fill-yellow-500/50 -ml-0.5" />
      <Star size={12} className="text-yellow-500 fill-yellow-500/30 -ml-0.5" />
    </div>
  );
  return (
    <div className="flex">
      <Star size={12} className="text-yellow-500 fill-yellow-500" />
      <Star size={12} className="text-yellow-500 fill-yellow-500/30 -ml-0.5" />
      <Star size={12} className="text-yellow-500 fill-yellow-500/20 -ml-0.5" />
    </div>
  );
};

const SkillCategory = ({ title, icon: Icon, skills, index, animate, categoryColor }) => {
  const [hovered, setHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const categoryRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }
    
    return () => {
      if (categoryRef.current) {
        observer.unobserve(categoryRef.current);
      }
    };
  }, []);

  // Calculate max level for this category
  const maxLevel = Math.max(...skills.map(skill => skill.level));
  const topSkill = skills.find(skill => skill.level === maxLevel);

  return (
    <div 
      ref={categoryRef}
      className={`relative transform-gpu transition-all duration-700 ${animate && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActiveSkill(null);
      }}
    >
      {/* 3D Card Container */}
      <div 
        className="relative perspective transition-all duration-500"
        style={{
          transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        }}
      >
        {/* Floating Glow Effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${categoryColor} rounded-2xl blur-lg transform transition-all duration-500 -z-10 ${hovered ? 'opacity-40 scale-105' : 'opacity-0 scale-95'}`}
        ></div>
        
        {/* Card with 3D Tilt Effect */}
        <div 
          className={`neo-card rounded-2xl p-8 transition-all duration-500 transform-gpu ${hovered ? 'shadow-glow' : 'shadow-xl'}`}
          style={{
            transform: hovered ? 'rotateX(2deg) rotateY(2deg)' : 'rotateX(0) rotateY(0)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Card Header with 3D Icon */}
          <div className="flex items-center mb-6">
            <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
              {/* Icon Background with Elevation */}
              <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor} rounded-xl transform transition-transform duration-500 ${hovered ? 'scale-125 -translate-z-2' : 'scale-100'}`}></div>
              
              {/* Icon Container */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl relative border border-gray-100 dark:border-gray-700 transform transition-transform duration-500" style={{
                transform: hovered ? 'translateZ(20px)' : 'translateZ(0)'
              }}>
                <Icon className={`w-6 h-6 ${categoryColor.includes('purple') ? 'text-purple-600 dark:text-purple-400' : categoryColor.includes('indigo') ? 'text-indigo-600 dark:text-indigo-400' : categoryColor.includes('blue') ? 'text-blue-600 dark:text-blue-400' : 'text-teal-600 dark:text-teal-400'}`} />
              </div>
            </div>
            
            {/* Category Title with 3D Effect */}
            <div className="ml-4 transform-gpu" style={{
              transform: hovered ? 'translateZ(10px)' : 'translateZ(0)',
              transition: 'transform 0.5s ease'
            }}>
              <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${categoryColor}`}>
                {title}
              </h3>
              
              {/* Top Skill Badge */}
              {topSkill && (
                <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <Award size={12} className="text-yellow-500 mr-1" />
                  <span>Best: {topSkill.name}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Skills List */}
          <div className="space-y-5 relative">
            {skills.map((skill, skillIndex) => (
              <div 
                key={skill.name}
                className="relative"
                onMouseEnter={() => setActiveSkill(skill.name)}
                onMouseLeave={() => setActiveSkill(null)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s cubic-bezier(0.2, 0.85, 0.4, 1.275)',
                  transitionDelay: `${(index * 150) + (skillIndex * 100) + 300}ms`
                }}
              >
                {/* Skill Header */}
                <div className="flex justify-between items-center mb-2 group">
                  <div className="flex items-center">
                    {/* Skill Name */}
                    <div 
                      className={`flex items-center relative transition-transform duration-300 ${activeSkill === skill.name ? 'transform translate-x-1' : ''}`}
                    >
                      <ChevronRight size={16} className={`${categoryColor.includes('purple') ? 'text-purple-500' : categoryColor.includes('indigo') ? 'text-indigo-500' : categoryColor.includes('blue') ? 'text-blue-500' : 'text-teal-500'} transition-all duration-300 ${activeSkill === skill.name ? 'translate-x-1 opacity-100' : 'opacity-70'}`} />
                      <span className={`font-medium transition-all duration-300 ${activeSkill === skill.name ? 'text-gray-900 dark:text-white translate-x-1' : 'text-gray-700 dark:text-gray-300'}`}>
                        {skill.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Level Display */}
                  <div className="flex items-center space-x-2">
                    <SkillStars level={skill.level} />
                    <span className={`text-sm font-bold transition-all duration-300 ${categoryColor.includes('purple') ? 'text-purple-600 dark:text-purple-400' : categoryColor.includes('indigo') ? 'text-indigo-600 dark:text-indigo-400' : categoryColor.includes('blue') ? 'text-blue-600 dark:text-blue-400' : 'text-teal-600 dark:text-teal-400'} ${activeSkill === skill.name ? 'scale-110' : ''}`}>
                      {skill.level}%
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar with Advanced Animation */}
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                  {/* Background Pulse */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${categoryColor} opacity-10 rounded-full ${activeSkill === skill.name ? 'animate-pulse-fast' : ''}`}
                  ></div>
                  
                  {/* Progress Track */}
                  <div 
                    className={`h-full bg-gradient-to-r ${categoryColor} rounded-full relative transform origin-left transition-all duration-1000 ease-out flex items-center ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{ 
                      width: `${skill.level}%`,
                      boxShadow: activeSkill === skill.name ? `0 0 15px rgba(139, 92, 246, 0.5)` : 'none',
                      transitionDelay: `${(index * 100) + (skillIndex * 150) + 300}ms`
                    }}
                  >
                    {/* Shine Effect */}
                    <div className={`absolute top-0 right-0 h-full w-8 bg-white opacity-30 transform skew-x-30deg ${hovered ? 'animate-shine' : ''}`}></div>
                    
                    {/* Progress Bubbles for high-level skills */}
                    {skill.level >= 90 && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute h-2 w-2 rounded-full bg-white opacity-40 right-3 top-0.5 animate-bubble-1"></div>
                        <div className="absolute h-1.5 w-1.5 rounded-full bg-white opacity-40 right-6 top-0.5 animate-bubble-2"></div>
                        <div className="absolute h-1 w-1 rounded-full bg-white opacity-40 right-10 top-1 animate-bubble-3"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);
  
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

  const categoryIcons = {
    frontend: Code,
    backend: Terminal,
    soft: Database,
    tools: Palette
  };

  const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    soft: "Databases",
    tools: "Tools"
  };
  
  const categoryColors = {
    frontend: "from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500",
    backend: "from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500",
    soft: "from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500",
    tools: "from-cyan-600 to-teal-600 dark:from-cyan-500 dark:to-teal-500"
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid dark:bg-grid-dark"></div>
      
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-float"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Animation */}
        <div className={`text-center mb-16 perspective transition-all duration-500 ${animate ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="glitch-text text-6xl font-black">
            <span aria-hidden="true">My Skills</span>
            My Skills
            <span aria-hidden="true">My Skills</span>
          </h2>
          
          <div className="mt-6 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
            </div>
            <div className="relative bg-white dark:bg-gray-900 px-4 py-1">
              <div className="flex items-center space-x-2 text-gradient from-purple-500 to-indigo-500">
                <Zap size={16} />
                <span className="text-sm font-medium uppercase tracking-widest">Expertise & Technologies</span>
                <Zap size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid with Perspective */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 perspective">
          {Object.keys(skills).map((category, index) => (
            <SkillCategory 
              key={category}
              title={categoryTitles[category]} 
              icon={categoryIcons[category]} 
              skills={skills[category]}
              index={index}
              animate={animate}
              categoryColor={categoryColors[category]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}