import React, { useState } from 'react';
import './QuantityPopup.css';

function QuantityPopup({ item, onClose, onAddToOrder }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleSubmit = () => {
    onAddToOrder({ ...item, quantity });
    onClose();
  };

  return (
    <div className="quantity-popup-overlay">
      <div className="quantity-popup">
        <h3>{item.name}</h3>
        <p>RM {item.price.toFixed(2)}</p>
        <div className="quantity-control">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <button onClick={handleSubmit} className="add-to-order-btn">Add to Order</button>
        <button onClick={onClose} className="close-btn">Cancel</button>
      </div>
    </div>
  );
}

export default QuantityPopup;