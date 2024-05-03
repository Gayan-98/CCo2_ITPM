import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const categoryView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch categories from the database
    axios.get('YOUR_API_ENDPOINT')
      .then(response => {
        setCategories(response.data); // Assuming the response contains an array of categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    history.push(`/quiz-insert?category=${category}`);
  };

  return (
    <div>
      <h2>Select a Category</h2>
      {categories.map(category => (
        <button
          key={category.id} // Assuming each category object has a unique ID
          onClick={() => handleCategorySelect(category.name)} // Change to whatever property represents the category name
          style={{ marginRight: '10px', marginBottom: '10px' }}
          className={selectedCategory === category.name ? 'selected' : ''}
        >
          {category.name} {/* Change to whatever property represents the category name */}
        </button>
      ))}
    </div>
  );
};

export default categoryView;
