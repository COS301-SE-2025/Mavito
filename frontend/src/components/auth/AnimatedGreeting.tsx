
import React, { useState, useEffect } from 'react';
import '../../styles/AnimatedGreeting.css'; 

const greetings = [
  "Hello", "Hallo", "Sanibonani", "Molo",
  "Lotjhani", "Dumela", "Xewani", "Ndaa","Sawubona"
];

const AnimatedGreeting: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [isVisible, setIsVisible] = useState(true);
currentIndex;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false); 

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % greetings.length;
          setCurrentGreeting(greetings[nextIndex]);
          return nextIndex;
        });
        setIsVisible(true); 
      }, 500); 
    }, 3000); 

    return () => clearInterval(intervalId); 
  }, []); 

  return (
    <h1 className={`info-text ${isVisible ? 'fade-in' : 'fade-out'}`}>
      {currentGreeting}
    </h1>
  );
};


export default AnimatedGreeting; 