import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';

function Order({ order, removeFromOrder, updateQuantity }) {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [order]);

  const handleRemoveItem = (index) => {
    removeFromOrder(index);
  };

  const handleQuantityChange = (index, change) => {
    const newQuantity = Math.max(1, order[index].quantity + change);
    updateQuantity(index, newQuantity);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: order.map(item => ({ food: item.id, quantity: item.quantity })),
        totalAmount: totalAmount,
        customerName: "Customer Name", // You might want to get this from user input
        deliveryAddress: "Delivery Address", // You might want to get this from user input
        contactNumber: "Contact Number" // You might want to get this from user input
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      alert('Order placed successfully!');
      // You might want to clear the order or redirect the user after successful order placement
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div className="order-container">
      <h2>Your Order</h2>
      {order.length === 0 ? (
        <p>Your order is empty. Add some items from the menu!</p>
      ) : (
        <>
          <ul className="order-list">
            {order.map((item, index) => (
              <li key={index} className="order-item">
                <img src={item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <h3>{item.name}</h3>
                  <p>RM {item.price.toFixed(2)}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                </div>
                <button onClick={() => handleRemoveItem(index)} className="remove-item-btn">Remove</button>
              </li>
            ))}
          </ul>
          <div className="order-summary">
            <h3>Total: RM {totalAmount.toFixed(2)}</h3>
            <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Order;