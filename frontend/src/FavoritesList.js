// src/FavoritesList.js
import React from 'react';

function FavoritesList({ favorites, onDelete }) {
  
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>type</th>
          <th>url</th>
          <th>manage</th>
        </tr>
      </thead>
      <tbody>
        {favorites.map(favorite => (
          <tr key={favorite.id}>
            <td>{favorite.id}</td>
            <td>{favorite.name}</td>
            <td>{favorite.type}</td>
            <td>{favorite.url}</td>
            <td>
              <button onClick={() => {/* Handle edit */}}>edit</button> |
              <button onClick={() => onDelete(favorite.id)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



export default FavoritesList;
