import { useState, useEffect } from 'react';
import { subscribeToMenu } from '../firebase/db';

/**
 * Custom hook to fetch and return list of salads from the menu
 * @returns {Array<string>} Array of salad names, sorted alphabetically
 */
const useSalads = () => {
  const [salads, setSalads] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToMenu((menuItems) => {
      // Filter for salad type and extract names
      const saladNames = menuItems
        .filter(item => item.type === 'salad' && item.name)
        .map(item => item.name)
        .sort(); // Sort alphabetically
      
      setSalads(saladNames);
    });

    return () => unsubscribe();
  }, []);

  return salads;
};

export default useSalads;
