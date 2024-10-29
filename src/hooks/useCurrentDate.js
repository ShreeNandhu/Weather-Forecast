
import { useState, useEffect } from 'react';

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // Format date as "Month Day, Year" (e.g., "October 26, 2024")
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      let displayDate;

      // Check if the date is today or tomorrow
      if (now.toDateString() === today.toDateString()) {
        displayDate = "Today";
      } else if (now.toDateString() === tomorrow.toDateString()) {
        displayDate = "Tomorrow";
      } else {
        displayDate = now.toLocaleDateString('en-US', options);
      }

      setCurrentDate(displayDate);
    };

    // Initialize immediately and set interval
    updateDate();
    const intervalId = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return currentDate; // Return the current date
};

export default useCurrentDate;
