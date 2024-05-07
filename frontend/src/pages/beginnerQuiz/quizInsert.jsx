import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "./quizInsert.scss"

const QuizInsert = () => {
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    category: '', 
  });

  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      localStorage.setItem('selectedCategoryId', value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/categories/${formData.category}/questions`, formData);
      console.log(response.data); 
      alert("success");
      setFormData({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: '',
        category: '', 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container1">
      <div className="registration-form">
        <h2>Question</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter question"
            value={formData.question}
            onChange={handleInputChange}
            required
          />
          {[1, 2, 3, 4].map((index) => (
            <input
              key={index}
              type="text"
              name={`option${index}`}
              placeholder={`Answer Option ${index}`}
              value={formData[`option${index}`]}
              onChange={handleInputChange}
              required
            />
          ))}
          <input
            type="text"
            name="correctAnswer"
            placeholder="Insert Correct Answer"
            value={formData.correctAnswer}
            onChange={handleInputChange}
            required
          />
          <label>Select Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuizInsert;
