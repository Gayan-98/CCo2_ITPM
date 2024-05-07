// import React, { UseState, UseEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './categoryView.scss';

// const categoryView = () => {
//   const [categories, setCategories] = UseState([]);
//   const [selectedCategory, setSelectedCategory] = UseState('');
//   const navigate = useNavigate();


//   UseEffect(() => {
//     // Fetch categories from the database
//     axios.get('YOUR_API_ENDPOINT')
//       .then(response => {
//         setCategories(response.data); // Assuming the response contains an array of categories
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []); // Empty dependency array ensures useEffect runs only once on component mount

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     navigate.push(`/quiz-insert?category=${category}`);
//   };

//   return (
//     <div>
//       <h2>Select a Category</h2>
//       {categories.map(category => (
//         <button
//           key={category.id} // Assuming each category object has a unique ID
//           onClick={() => handleCategorySelect(category.name)} // Change to whatever property represents the category name
//           style={{ marginRight: '10px', marginBottom: '10px' }}
//           className={selectedCategory === category.name ? 'selected' : ''}
//         >
//           {category.name} {/* Change to whatever property represents the category name */}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default categoryView;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './categoryView.scss';

const CategoryView = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate(); // Corrected the hook name

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
    navigate(`/quiz-insert?category=${category}`); // Corrected the navigation function
  };

  return (
    <div>
      <h2>Select a Category</h2>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategorySelect(category.name)}
          style={{ marginRight: '10px', marginBottom: '10px' }}
          className={selectedCategory === category.name ? 'selected' : ''}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryView;
