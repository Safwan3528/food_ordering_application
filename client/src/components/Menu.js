import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import QuantityPopup from './QuantityPopup';

export const restaurants = [
  {
    id: 1,
    name: "Nasi Lemak House",
    cuisine: "Malaysian Cuisine",
    rating: 4.5,
    image: "https://via.placeholder.com/300x200?text=Nasi+Lemak+House"
  },
  {
    id: 2,
    name: "Roti Canai Corner",
    cuisine: "Malaysian Street Food",
    rating: 4.2,
    image: "https://via.placeholder.com/300x200?text=Roti+Canai+Corner"
  },
  {
    id: 3,
    name: "Satay Station",
    cuisine: "Malaysian BBQ",
    rating: 4.7,
    image: "https://via.placeholder.com/300x200?text=Satay+Station"
  },
  {
    id: 4,
    name: "Laksa Shack",
    cuisine: "Malaysian Noodles",
    rating: 4.3,
    image: "https://via.placeholder.com/300x200?text=Laksa+Shack"
  },
  {
    id: 5,
    name: "Rendang Express",
    cuisine: "Malaysian Curry",
    rating: 4.6,
    image: "https://via.placeholder.com/300x200?text=Rendang+Express"
  },
  {
    id: 6,
    name: "Char Kuey Teow Wok",
    cuisine: "Malaysian Stir-Fry",
    rating: 4.4,
    image: "https://via.placeholder.com/300x200?text=Char+Kuey+Teow+Wok"
  }
];

export const menuItems = [
  {
    id: 1,
    name: "Nasi Lemak",
    price: 8.50,
    image: "https://via.placeholder.com/200x150?text=Nasi+Lemak",
    description: "Coconut rice with sambal, anchovies, peanuts, and cucumber"
  },
  {
    id: 2,
    name: "Roti Canai",
    price: 3.50,
    image: "https://via.placeholder.com/200x150?text=Roti+Canai",
    description: "Flaky flatbread served with dal curry"
  },
  {
    id: 3,
    name: "Satay (6 sticks)",
    price: 12.00,
    image: "https://via.placeholder.com/200x150?text=Satay",
    description: "Grilled meat skewers with peanut sauce"
  },
  {
    id: 4,
    name: "Laksa",
    price: 11.50,
    image: "https://via.placeholder.com/200x150?text=Laksa",
    description: "Spicy noodle soup with coconut milk"
  },
  {
    id: 5,
    name: "Beef Rendang",
    price: 15.00,
    image: "https://via.placeholder.com/200x150?text=Beef+Rendang",
    description: "Slow-cooked beef in coconut milk and spices"
  },
  {
    id: 6,
    name: "Char Kuey Teow",
    price: 9.50,
    image: "https://via.placeholder.com/200x150?text=Char+Kuey+Teow",
    description: "Stir-fried flat rice noodles with shrimp and bean sprouts"
  }
];

function Menu({ addToOrder }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - 0.5 <= rating) {
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackClick = () => {
    setSelectedRestaurant(null);
  };

  const handleAddToOrderClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleAddToOrder = (item) => {
    addToOrder(item);
    alert(`${item.quantity} ${item.name}(s) added to your order!`);
    setSelectedItem(null);
  };

  return (
    <div className="menu-container">
      {!selectedRestaurant ? (
        <>
          <h1>Choose your Restaurant</h1>
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card" onClick={() => handleRestaurantClick(restaurant)}>
                <img src={restaurant.image} alt={restaurant.name} />
                <h2>{restaurant.name}</h2>
                <p>{restaurant.cuisine}</p>
                <div className="rating">
                  {renderStars(restaurant.rating)}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="restaurant-menu">
          <button className="back-button" onClick={handleBackClick}>Back to Restaurants</button>
          <h1>{selectedRestaurant.name}</h1>
          <h2>Menu</h2>
          <div className="menu-items-grid">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-item-card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>RM {item.price.toFixed(2)}</p>
                <button className="order-button" onClick={() => handleAddToOrderClick(item)}>Add to Order</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedItem && (
        <QuantityPopup
          item={selectedItem}
          onClose={handleClosePopup}
          onAddToOrder={handleAddToOrder}
        />
      )}
    </div>
  );
}

export default Menu;