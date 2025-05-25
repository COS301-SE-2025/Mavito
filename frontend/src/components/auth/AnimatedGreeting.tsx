
import React, { useState, useEffect } from 'react';
import '../../styles/AnimatedGreeting.css';

const greetings = [
  'Hello',
  'Hallo',
  'Sanibonani',
  'Molo',
  'Lotjhani',
  'Dumela',
  'Xewani',
  'Ndaa',
  'Sawubona',
];

const AnimatedGreeting: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <h1 className={`info-text ${isVisible ? 'fade-in' : 'fade-out'}`}>
      {greetings[currentIndex]}
    </h1>
  );
};

export default AnimatedGreeting;
