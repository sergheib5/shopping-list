import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

// Shopping List Collection
const SHOPPING_LIST_COLLECTION = 'shoppingList';
const MENU_COLLECTION = 'menu';

// Shopping List Functions
export const subscribeToShoppingList = (callback) => {
  const q = query(collection(db, SHOPPING_LIST_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(items);
  });
};

export const addShoppingItem = async (item) => {
  return await addDoc(collection(db, SHOPPING_LIST_COLLECTION), {
    ...item,
    createdAt: new Date(),
    checked: false
  });
};

export const updateShoppingItem = async (id, updates) => {
  const itemRef = doc(db, SHOPPING_LIST_COLLECTION, id);
  return await updateDoc(itemRef, updates);
};

export const deleteShoppingItem = async (id) => {
  return await deleteDoc(doc(db, SHOPPING_LIST_COLLECTION, id));
};

export const toggleShoppingItem = async (id, checked) => {
  return await updateShoppingItem(id, { checked });
};

// Menu Functions
export const subscribeToMenu = (callback) => {
  const q = query(collection(db, MENU_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(items);
  });
};

export const addMenuItem = async (item) => {
  return await addDoc(collection(db, MENU_COLLECTION), {
    ...item,
    createdAt: new Date()
  });
};

export const updateMenuItem = async (id, updates) => {
  const itemRef = doc(db, MENU_COLLECTION, id);
  return await updateDoc(itemRef, updates);
};

export const deleteMenuItem = async (id) => {
  return await deleteDoc(doc(db, MENU_COLLECTION, id));
};

