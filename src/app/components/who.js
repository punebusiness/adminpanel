"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faUsers, faHeart, faGlobe, faAward, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const WhoWeAreSection = () => {
  const descriptions = [
    {
      title: 'Mission & Vision',
      description: 'Our mission is to provide quality education and foster innovation in learning.',
      icon: <FontAwesomeIcon icon={faGem} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Dedicated Team',
      description: 'We have a team of dedicated professionals committed to your success.',
      icon: <FontAwesomeIcon icon={faUsers} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Passion for Education',
      description: 'Driven by passion, we strive to make a positive impact on every student.',
      icon: <FontAwesomeIcon icon={faHeart} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Global Perspective',
      description: 'Our programs offer a global perspective to prepare you for a connected world.',
      icon: <FontAwesomeIcon icon={faGlobe} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Recognitions & Awards',
      description: 'Proudly recognized for excellence in education with prestigious awards.',
      icon: <FontAwesomeIcon icon={faAward} className="text-4xl mb-4 text-blue-500" />,
    },
    {
      title: 'Innovation Hub',
      description: 'We foster innovation and creativity, preparing you for future challenges.',
      icon: <FontAwesomeIcon icon={faLightbulb} className="text-4xl mb-4 text-blue-500" />,
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Who We Are</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8">
          {descriptions.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoWeAreSection;
