import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import { restaurants, menuItems } from './Menu';
import QuantityPopup from './QuantityPopup';

function Home({ addToOrder }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [popularMenus, setPopularMenus] = useState(menuItems.slice(0, 4));
  const [quantities, setQuantities] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Initialize quantities
    const initialQuantities = {};
    popularMenus.forEach(menu => {
      initialQuantities[menu.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [popularMenus]);

  const fetchPopularMenus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/foods/popular');
      setPopularMenus(response.data);
    } catch (error) {
      console.error('Error fetching popular menus:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/foods/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching foods:', error);
    }
  };

  const handleQuantityChange = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, prev[id] + change)
    }));
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
    handleClosePopup();
  };

  // Pilih 4 restoran secara acak untuk ditampilkan
  const popularRestaurants = restaurants.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Food Delivery System</h1>
          <p>Order your snacks, fruits and food using Food Ordering System by the click of a button.</p>
          <Link to="/menu" className="order-now-btn">Order Now</Link>
        </div>
      </div>
      
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for restaurants, cuisines, and dishes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            &#128269;
          </button>
        </form>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="food-cards">
            {searchResults.map((food) => (
              <div key={food._id} className="food-card">
                <img src={food.image} alt={food.name} />
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <p>Price: RM {food.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="popular-menus">
        <h2>Popular Menus</h2>
        <div className="menu-cards">
          {popularMenus.map((menu) => (
            <div key={menu.id} className="menu-card">
              <img src={menu.image} alt={menu.name} />
              <div className="menu-info">
                <h3>{menu.name}</h3>
                <p>RM {menu.price.toFixed(2)}</p>
                <p>{menu.description}</p>
                <button onClick={() => handleAddToOrderClick(menu)} className="add-to-order-btn">Add to Order</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cuisines">
        <h2>Your favourite cuisines</h2>
        <div className="cuisine-cards">
          {[
            { id: 1, name: 'Nasi Lemak', image: 'https://via.placeholder.com/100?text=Nasi+Lemak' },
            { id: 2, name: 'Roti Canai', image: 'https://via.placeholder.com/100?text=Roti+Canai' },
            { id: 3, name: 'Laksa', image: 'https://via.placeholder.com/100?text=Laksa' },
            { id: 4, name: 'Rendang', image: 'https://via.placeholder.com/100?text=Rendang' },
            { id: 5, name: 'Satay', image: 'https://via.placeholder.com/100?text=Satay' }
          ].map((item) => (
            <div key={item.id} className="cuisine-card">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="discover">
        <h2>Discover more</h2>
        <div className="discover-cards">
          <div className="discover-card halal">
            <h3>HALAL</h3>
            <p>HALAL-certified delivery</p>
          </div>
          <div className="discover-card coke-deal">
            <h3>Coke Deal</h3>
            <p>RM10 off meals with Coke</p>
          </div>
          <div className="discover-card hidden-gems">
            <h3>Hidden Gems</h3>
            <p>Hidden gems near you</p>
          </div>
          <div className="discover-card vespa">
            <h3>Win a Vespa</h3>
            <p>A chance to win a Vespa!</p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <img src="https://via.placeholder.com/200x150" alt="Enjoy Great Meal" />
          <h3>Enjoy Great Meal</h3>
        </div>
        <div className="feature-card">
          <img src="https://via.placeholder.com/200x150" alt="Go Out For Meal" />
          <h3>Go Out For Meal</h3>
        </div>
        <div className="feature-card">
          <img src="https://via.placeholder.com/200x150" alt="Night Life" />
          <h3>Night Life</h3>
        </div>
        <div className="feature-card">
          <img src="https://via.placeholder.com/200x150" alt="Stay Home Stay safe!" />
          <h3>Stay Home Stay safe!</h3>
        </div>
      </section>

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

export default Home;