import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Animation on scroll into view
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulated loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch('https://formspree.io/f/xdkaaolq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5 seconds
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
      setTimeout(() => setSubmitError(null), 5000); // Hide error message after 5 seconds
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Contact info items with animations
  const contactItems = [
    {
      icon: <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: 'Email',
      value: 'visionshikwambane19@gmail.com',
      link: 'mailto:visionshikwambane19@gmail.com',
      color: 'from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500',
    },
    {
      icon: <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: 'Phone',
      value: '+27 63 505 6047',
      link: 'tel:+27635056047',
      color: 'from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500',
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: 'Location',
      value: 'South Africa, Johannesburg',
      link: 'https://maps.google.com/?q=Johannesburg,South+Africa',
      color: 'from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500',
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Animation */}
        <div className={`text-center mb-16 ${animate ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mb-4">
            Get In Touch
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Have a question or want to work together? Feel free to reach out to me directly or use the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information Column */}
          <div className="lg:col-span-2 space-y-8">
            {contactItems.map((item, index) => (
              <div 
                key={index}
                className={`group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transitionDuration: '700ms',
                  transitionProperty: 'all',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="flex items-start space-x-5">
                  {/* Animated Icon Container */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      {/* Animated Gradient Border */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                      
                      {/* Icon Container */}
                      <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <a 
                      href={item.link}
                      target={item.title === 'Location' ? '_blank' : undefined}
                      rel={item.title === 'Location' ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
                    >
                      <span>{item.value}</span>
                      <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </div>
                </div>
                
                {/* Decorative Gradient Line */}
                <div className="mt-4 h-0.5 w-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  '--tw-gradient-from': 'rgba(124, 58, 237, 0.5)',
                  '--tw-gradient-to': 'rgba(99, 102, 241, 0.5)',
                  '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'
                }}></div>
              </div>
            ))}
            
            {/* Social Proof or Additional Information */}
            <div 
              className={`bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-xl p-6 text-white shadow-lg ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ 
                transitionDelay: '300ms',
                transitionDuration: '700ms',
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <h3 className="text-xl font-bold mb-2">Let's Build Something Amazing</h3>
              
            </div>
          </div>

          {/* Contact Form Column */}
          <div 
            className={`lg:col-span-3 ${animate ? 'animate-fade-in-delay' : 'opacity-0'}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 dark:bg-purple-900/20 rounded-bl-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/20 rounded-tr-full opacity-50"></div>
              
              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <label 
                    htmlFor="name" 
                    className={`block text-sm font-medium transition-all duration-300 ${
                      focusedField === 'name' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    required
                    disabled={isSubmitting}
                  />
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ${
                    focusedField === 'name' ? 'w-full' : 'w-0'
                  }`}></div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label 
                    htmlFor="email" 
                    className={`block text-sm font-medium transition-all duration-300 ${
                      focusedField === 'email' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    required
                    disabled={isSubmitting}
                  />
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ${
                    focusedField === 'email' ? 'w-full' : 'w-0'
                  }`}></div>
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <label 
                    htmlFor="message" 
                    className={`block text-sm font-medium transition-all duration-300 ${
                      focusedField === 'message' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    rows={5}
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ${
                    focusedField === 'message' ? 'w-full' : 'w-0'
                  }`}></div>
                </div>

                {/* Submit Button with Animation */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                    
                    {/* Button Text */}
                    <div className="relative flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Success Message with Animation */}
                  {submitSuccess && (
                    <div className="flex items-center p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg animate-fade-in">
                      <CheckCircle size={20} className="mr-2 flex-shrink-0" />
                      <p>Thank you! Your message has been sent successfully.</p>
                    </div>
                  )}

                  {/* Error Message with Animation */}
                  {submitError && (
                    <div className="flex items-center p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg animate-fade-in">
                      <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                      <p>{submitError}</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}