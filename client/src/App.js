import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Order from './components/Order';
import './App.css';

function App() {
  const [order, setOrder] = useState([]);

  const addToOrder = (item) => {
    const existingItemIndex = order.findIndex(orderItem => orderItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedOrder = [...order];
      updatedOrder[existingItemIndex].quantity += item.quantity;
      setOrder(updatedOrder);
    } else {
      setOrder([...order, item]);
    }
  };

  const removeFromOrder = (index) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedOrder = [...order];
    updatedOrder[index].quantity = newQuantity;
    setOrder(updatedOrder);
  };

  return (
    <Router>
      <div className="App">
        <Navbar orderItemCount={order.reduce((sum, item) => sum + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<Home addToOrder={addToOrder} />} />
          <Route path="/menu" element={<Menu addToOrder={addToOrder} />} />
          <Route path="/order" element={<Order order={order} removeFromOrder={removeFromOrder} updateQuantity={updateQuantity} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
