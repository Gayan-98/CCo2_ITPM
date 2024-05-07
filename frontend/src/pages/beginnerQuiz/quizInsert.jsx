import React, { useState } from 'react';
import './quizInsert.scss'; 
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import quizBackground from '../../assets/1.png'; // Adjust the path accordingly

const QuizInsert = () => {
  const [formData, setFormData] = useState({
    Question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    category: '', 
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {

// Create an array containing option values
const options = [formData.option1, formData.option2, formData.option3, formData.option4];


     // Check if correctAnswer is included in options
    if (!options.includes(formData.correctAnswer)) {
      alert("The correct answer must match one of the provided options.");
    return;
  }
    /*if (formData.correctAnswer !==formData.option1) {
      alert("Options does not contain the correct answer");
      return;
    }*/
    try {
      // Make POST request to backend
      await axios.post('/api/register', formData);
      alert('Question Submitted');
  } catch (error) {
      console.error('Question Submission failed:', error);
      alert('Question Submission failed');
  }
    console.log('Question submitted:', formData);
  };


  return (
    <div  className="container1">
    <div className="registration-form">
      <h2>Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Question"
          placeholder="Enter question"
          value={formData.Question}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="option1"
          placeholder="Answer Option 1"
          value={formData.option1}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="option2"
          placeholder="Answer Option 2"
          value={formData.option2}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="option3"
          placeholder="Answer Option 3"
          value={formData.option3}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="option4"
          placeholder="Answer Option 4"
          value={formData.option4}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="correctAnswer"
          placeholder="Insert Correct Answer"
          value={formData.correctAnswer}
          onChange={handleInputChange}
          required
          //minlength="8"
        />        
        <label>Selected Category:</label>
        <input
          type="text"
          value={selectedCategory}
          disabled // Set to disabled to prevent editing
        />
        <button type="submit">Submit</button>
      </form>
    </div>

     <div className="illustration-section">
        <img src={quizBackground} width={1150} alt="Sign In Background" />
      </div>
    </div>
  );
};

export default QuizInsert;