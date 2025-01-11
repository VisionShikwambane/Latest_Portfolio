import React from 'react';
import { BookOpen, Briefcase } from 'lucide-react';

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
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
            I’m a passionate full-stack software developer with experience in building scalable web applications and delivering efficient software solutions. I specialize in designing and implementing various solutions that improve business processes and enhance user experiences.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
            My journey in software development began with a fascination for technology and problem-solving, and it has grown into a career where I get to create and innovate every day. I thrive in Agile environments, continuously learning and applying best practices to build real-world, production-ready applications. I’m also interested in emerging trends and opportunities in the tech industry.
            </p>
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                Download CV
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-8 inset-y-0 w-0.5 bg-purple-600"></div>
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div key={index} className="relative pl-12">
                  <span className="absolute left-6 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    {item.type === 'work' ? (
                      <Briefcase className="w-3 h-3 text-white" />
                    ) : (
                      <BookOpen className="w-3 h-3 text-white" />
                    )}
                  </span>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
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