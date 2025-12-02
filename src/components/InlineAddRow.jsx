import { useState, useRef, useEffect } from 'react';
import { STORES } from '../utils/constants';
import './InlineAddRow.css';

const InlineAddRow = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    store: 'Fresh Farm',
    quantity: ''
  });

  const nameInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Focus on item name input when component mounts
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Keep focus on name input for continuous flow
  useEffect(() => {
    // Focus on name input when form is empty (after saving)
    const isEmpty = !formData.name.trim() && !formData.quantity.trim();
    if (isEmpty && nameInputRef.current) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [formData.name, formData.quantity]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      // Reset form for next item
      setFormData({
        name: '',
        store: 'Fresh Farm',
        quantity: ''
      });
      // Focus back on name input immediately for continuous flow
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (formData.name.trim()) {
        handleSubmit(e);
      } else {
        // If name is empty, just focus on name input
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      // Clear form if it has content
      if (formData.name.trim() || formData.quantity.trim()) {
        setFormData({
          name: '',
          store: 'Fresh Farm',
          quantity: ''
        });
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }
    }
  };

  return (
    <form className="inline-add-row" onSubmit={handleSubmit} ref={formRef}>
      <div className="col-item-wide">
        <input
          ref={nameInputRef}
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Item name..."
          className="inline-input item-input"
          required
        />
      </div>
      <div className="col-store-compact">
        <select
          value={formData.store}
          onChange={(e) => handleChange('store', e.target.value)}
          className="inline-select"
          onKeyDown={handleKeyDown}
        >
          {STORES.map(store => (
            <option key={store} value={store}>{store}</option>
          ))}
        </select>
      </div>
      <div className="col-quantity-compact">
        <input
          type="text"
          value={formData.quantity}
          onChange={(e) => handleChange('quantity', e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Qty"
          className="inline-input quantity-input"
        />
      </div>
    </form>
  );
};

export default InlineAddRow;
