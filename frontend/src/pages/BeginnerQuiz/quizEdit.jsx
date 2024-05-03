import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './quizEdit.scss';
import { useParams } from 'react-router-dom';

const quizEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
  });

  useEffect(() => {
    // Fetch question details based on the ID from the URL parameter
    axios.get(`API_ENDPOINT/${id}`)
      .then(response => {
        setFormData(response.data); // Assuming the response contains question details
      })
      .catch(error => {
        console.error('Error fetching question details:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement update functionality here
  };

  return (
    <div>
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit}>
        <label>Question:</label>
        <input type="text" name="Question" value={formData.Question} onChange={handleInputChange} />
        <label>Option 1:</label>
        <input type="text" name="option1" value={formData.option1} onChange={handleInputChange} />
        <label>Option 2:</label>
        <input type="text" name="option2" value={formData.option2} onChange={handleInputChange} />
        <label>Option 3:</label>
        <input type="text" name="option3" value={formData.option3} onChange={handleInputChange} />
        <label>Option 4:</label>
        <input type="text" name="option4" value={formData.option4} onChange={handleInputChange} />
        <label>Correct Answer:</label>
        <input type="text" name="correctAnswer" value={formData.correctAnswer} onChange={handleInputChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default quizEdit;
