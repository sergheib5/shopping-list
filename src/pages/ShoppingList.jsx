import { useState, useEffect } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import InlineAddRow from '../components/InlineAddRow';
import EditableShoppingRow from '../components/EditableShoppingRow';
import { 
  subscribeToShoppingList, 
  addShoppingItem,
  updateShoppingItem,
  toggleShoppingItem,
  deleteShoppingItem 
} from '../firebase/db';
import { STORES, getStoreColor } from '../utils/constants';
import './ShoppingList.css';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [selectedStore, setSelectedStore] = useState('All');

  useEffect(() => {
    const unsubscribe = subscribeToShoppingList((items) => {
      setItems(items);
    });

    return () => unsubscribe();
  }, []);

  const handleAddItem = async (itemData) => {
    try {
      await addShoppingItem(itemData);
      // Add row stays visible for continuous adding
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleUpdateItem = async (itemId, itemData) => {
    try {
      await updateShoppingItem(itemId, itemData);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item. Please try again.');
    }
  };

  const handleToggleItem = async (id, checked) => {
    try {
      await toggleShoppingItem(id, checked);
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteShoppingItem(id);
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  // Filter items based on selected store
  const filteredItems = selectedStore === 'All' 
    ? items 
    : items.filter(item => item.store === selectedStore);

  return (
    <div className="shopping-list-page">
      <Header />
      <main className="main-content">
        <div className="shopping-list-container">
          {/* Store filter */}
          <div className="store-filter">
            <button
              className={`filter-button ${selectedStore === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedStore('All')}
            >
              All
            </button>
            {STORES.map(store => (
              <button
                key={store}
                className={`filter-button ${selectedStore === store ? 'active' : ''}`}
                onClick={() => setSelectedStore(store)}
                style={{
                  backgroundColor: selectedStore === store ? getStoreColor(store) : 'white',
                  color: selectedStore === store ? 'white' : '#333',
                  borderColor: getStoreColor(store)
                }}
              >
                {store}
              </button>
            ))}
          </div>
          
          {/* Add form at the top */}
          <InlineAddRow
            onSave={handleAddItem}
          />
          <div className="shopping-list-table">
            <div className="table-body">
              {filteredItems.length === 0 ? (
                <div className="empty-message">
                  {selectedStore === 'All' 
                    ? 'No items in your shopping list yet' 
                    : `No items for ${selectedStore} yet`}
                </div>
              ) : (
                filteredItems.map((item) => (
                  <EditableShoppingRow
                    key={item.id}
                    item={item}
                    onToggle={handleToggleItem}
                    onDelete={handleDeleteItem}
                    onSave={handleUpdateItem}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default ShoppingList;

