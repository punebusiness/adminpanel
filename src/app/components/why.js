"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faChalkboardTeacher, faBuilding, faUsers, faHandsHelping, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const WhyChooseUsSection = () => {
  const reasons = [
    {
      title: 'Quality Education',
      description: 'We provide high-quality education with a focus on excellence.',
      icon: <FontAwesomeIcon icon={faGraduationCap} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Experienced Faculty',
      description: 'Our faculty members are experienced and dedicated to your success.',
      icon: <FontAwesomeIcon icon={faChalkboardTeacher} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Modern Facilities',
      description: 'Enjoy state-of-the-art facilities that enhance your learning experience.',
      icon: <FontAwesomeIcon icon={faBuilding} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Career Opportunities',
      description: 'Unlock diverse career opportunities with our comprehensive programs.',
      icon: <FontAwesomeIcon icon={faUsers} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Community Engagement',
      description: 'Be part of a vibrant community that encourages collaboration and growth.',
      icon: <FontAwesomeIcon icon={faHandsHelping} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Innovative Programs',
      description: 'Explore innovative programs designed to meet the demands of the future.',
      icon: <FontAwesomeIcon icon={faLightbulb} className="text-4xl mb-4 text-blue-500" />,
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              {reason.icon}
              <h3 className="text-xl font-semibold mb-4">{reason.title}</h3>
              <p className="text-gray-700">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
