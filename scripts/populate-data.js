import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');

let envVars = {};
try {
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      envVars[key] = value;
    }
  });
} catch (error) {
  console.warn('Warning: Could not read .env file, using process.env');
}

// Use env file values or fall back to process.env
const getEnv = (key) => envVars[key] || process.env[key];

// Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID')
};

// Validate configuration
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your-api-key') {
  console.error('❌ Error: Firebase configuration not found in .env file');
  console.error('Please make sure your .env file contains all VITE_FIREBASE_* variables');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Shopping list data from the spreadsheet
const shoppingListItems = [
  { name: 'Salad Mix', store: 'Fresh Farm', quantity: '', notes: '' },
  { name: 'Mandarins', store: 'Fresh Farm', quantity: '15 lb', notes: '' },
  { name: 'Avocado', store: 'Fresh Farm', quantity: '2', notes: '' },
  { name: 'Shaved Parmesan', store: 'Fresh Farm', quantity: '', notes: '' },
  { name: 'Shrimps', store: 'Fresh Farm', quantity: '', notes: '' },
  { name: 'Red Onion or Shallot', store: 'Fresh Farm', quantity: '', notes: '' },
  { name: 'Vanilla Vodka 750', store: "Binny's", quantity: '', notes: '' },
  { name: 'Chinola Passion fruit liquor 750', store: "Binny's", quantity: '', notes: '', checked: true },
  { name: 'Dole Pinappple Juice 46oz', store: "Binny's", quantity: '', notes: '' },
  { name: 'Prosecco', store: 'Costco', quantity: '5 x 750', notes: '' },
  { name: 'Lime Juice', store: "Binny's", quantity: '', notes: '' },
  { name: 'Wine for Mulled wine', store: "Binny's", quantity: '2 L', notes: '' }
];

// Menu data from the spreadsheet
const menuItems = [
  // Daily menu items
  { type: 'daily', date: 'December 30', lunch: 'N/A', dinner: 'Pizza' },
  { type: 'daily', date: 'December 31', lunch: '', dinner: '' },
  { type: 'daily', date: 'January 1', lunch: '', dinner: '' },
  { type: 'daily', date: 'January 2', lunch: '', dinner: '' },
  { type: 'daily', date: 'January 3', lunch: '', dinner: '' },
  
  // Salads
  { type: 'salad', name: 'Mandarin/Shrimp', preparedBy: 'Eve' },
  { type: 'salad', name: 'Seafood Salad', preparedBy: 'Anastasiia' },
  { type: 'salad', name: 'Olivie', preparedBy: 'Natasha' },
  { type: 'salad', name: 'Stuffed Mushroom', preparedBy: 'Elena' },
  
  // Drinks
  { type: 'drink', name: 'Passion Fruit Martini (Pornstar Martini) by Eve' },
  { type: 'drink', name: 'Mulled Wine' }
];

async function populateData() {
  try {
    console.log('Starting data population...\n');

    // Add shopping list items
    console.log('Adding shopping list items...');
    for (const item of shoppingListItems) {
      const docRef = await addDoc(collection(db, 'shoppingList'), {
        ...item,
        checked: item.checked || false,
        createdAt: new Date()
      });
      console.log(`  ✓ Added: ${item.name} (${item.store})`);
    }

    console.log(`\n✓ Added ${shoppingListItems.length} shopping list items\n`);

    // Add menu items
    console.log('Adding menu items...');
    for (const item of menuItems) {
      const docRef = await addDoc(collection(db, 'menu'), {
        ...item,
        createdAt: new Date()
      });
      const displayName = item.name || `${item.date} (${item.lunch || 'N/A'}/${item.dinner || 'N/A'})`;
      console.log(`  ✓ Added: ${displayName} (${item.type})`);
    }

    console.log(`\n✓ Added ${menuItems.length} menu items\n`);
    console.log('✅ Data population completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error populating data:', error);
    process.exit(1);
  }
}

populateData();

