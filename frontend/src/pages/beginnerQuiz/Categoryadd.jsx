import React, { useState } from 'react';
import axios from 'axios';
import './Categoryadd.scss';

const CategoryAddForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/categories', { name });
      console.log('Category added successfully');
    alert("Category added successfully");
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Category Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryAddForm;
