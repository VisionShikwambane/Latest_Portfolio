import React from 'react';
import { Code, Database, Palette, Terminal, Users } from 'lucide-react';

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

const SkillCategory = ({ title, icon: Icon, skills }: any) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center mb-6">
      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <div className="space-y-4">
      {skills.map((skill: any) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Skills</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SkillCategory title="Frontend" icon={Code} skills={skills.frontend} />
          <SkillCategory title="Backend" icon={Terminal} skills={skills.backend} />
          <SkillCategory title="Databases" icon={Database} skills={skills.soft} />
          <SkillCategory title="Tools" icon={Palette} skills={skills.tools} />
          
        </div>
      </div>
    </section>
  );
}