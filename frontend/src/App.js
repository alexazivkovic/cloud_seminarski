// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList';
import AddFavoriteForm from './AddFavoriteForm';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites from the backend
    axios.get('http://localhost:3000/favorites')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  const handleAddFavorite = (newFavorite) => {
  // Assuming your backend returns the newly added favorite, including its id
  setFavorites([...favorites, newFavorite]);
};

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/favorites/${id}`)
      .then(() => {
        // Update the state to remove the item with the given id
        setFavorites(favorites.filter(favorite => favorite.id !== id));
      })
      .catch(error => console.error('Error deleting favorite:', error));
  };

  const handleSubmit = (event, formData) => {
    event.preventDefault();
    axios.post('http://localhost:3000/favorites', formData)
      .then(response => {
        handleAddFavorite(formData);
        
      })
      .catch(error => console.error('Error adding favorite:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Favorite Movies and Episodes</h1>
      </header>
      <div className="App-body">
        <FavoritesList favorites={favorites} onDelete={handleDelete} />
        <AddFavoriteForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default App;
