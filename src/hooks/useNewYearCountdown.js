import { useState, useEffect, useRef } from 'react';

export const useNewYearCountdown = () => {
  // Calculate targetYear dynamically - updates when year changes
  const getTargetYear = () => new Date().getFullYear() + 1;
  const [targetYear, setTargetYear] = useState(getTargetYear());
  const targetYearRef = useRef(targetYear);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentTargetYear = getTargetYear();
      
      // Update targetYear if the year has changed (e.g., crossing year boundary)
      if (currentTargetYear !== targetYearRef.current) {
        targetYearRef.current = currentTargetYear;
        setTargetYear(currentTargetYear);
      }
      
      const newYear = new Date(currentTargetYear, 0, 1, 0, 0, 0, 0);
      const difference = newYear - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps - interval callback handles year changes

  return { ...timeLeft, targetYear };
};


