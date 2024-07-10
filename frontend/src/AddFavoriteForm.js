// src/AddFavoriteForm.js
import React, { useState } from 'react';

function AddFavoriteForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    url: ''
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const localHandleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event, formData);
  };

  return (
    <form onSubmit={localHandleSubmit}>
      <label>
        name<br/>
        <input name="name" value={formData.name} onChange={handleChange} />
      </label><br/>
      <label>
        type<br/>
        <input name="type" value={formData.type} onChange={handleChange} />
      </label><br/>
      <label>
        url<br/>
        <input name="url" value={formData.url} onChange={handleChange} />
      </label><br/>
      <button type="submit">ADD</button>
    </form>
  );
}



export default AddFavoriteForm;
