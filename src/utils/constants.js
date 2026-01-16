// Shared constants across the application

export const STORES = ['Fresh Farm', 'Aldi', 'Costco', "Binny's", 'Other'];

export const getStoreColor = (store) => {
  const storeColors = {
    'Fresh Farm': '#4caf50', // green
    'Aldi': '#2196f3', // blue
    'Costco': '#f44336', // red
    "Binny's": '#212121', // black
    'Other': '#9e9e9e' // gray
  };
  return storeColors[store] || storeColors['Other'];
};

// Auto-save debounce time in milliseconds
export const AUTO_SAVE_DEBOUNCE_MS = 500;

// Click outside handler delay in milliseconds
export const CLICK_OUTSIDE_DELAY_MS = 100;

// Get abbreviated store name for mobile display
export const getStoreAbbreviation = (store) => {
  const abbreviations = {
    'Fresh Farm': 'FF',
    'Aldi': 'Aldi',
    'Costco': 'Costco',
    "Binny's": "Binny's",
    'Other': 'Other'
  };
  return abbreviations[store] || store;
};


