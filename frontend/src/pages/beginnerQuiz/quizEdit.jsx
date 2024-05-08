import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './quizEdit.scss';

const UpdateQuestion = () => {
  const { id } = useParams(); 
  const [question, setQuestion] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: ''
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/questions/${id}`);
        setQuestion(response.data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleUpdateFormSubmit = () => {
    axios.put(`http://localhost:8080/questions/${id}`, question)
      .then(response => {
        console.log('Question updated successfully');
        alert("Question updated successfully");
      })
      .catch(error => {
        console.error('Error updating question:', error);
      });
  };

  return (
    <div className="update-question-container">
      <h2>Update Question</h2>
      <form onSubmit={handleUpdateFormSubmit}>
        <label>Question:</label>
        <input
          type="text"
          name="question"
          value={question.question}
          onChange={handleInputChange}
          required
        />
        <label>Option 1:</label>
        <input
          type="text"
          name="option1"
          value={question.option1}
          onChange={handleInputChange}
          required
        />
        <label>Option 2:</label>
        <input
          type="text"
          name="option2"
          value={question.option2}
          onChange={handleInputChange}
          required
        />
        <label>Option 3:</label>
        <input
          type="text"
          name="option3"
          value={question.option3}
          onChange={handleInputChange}
          required
        />
        <label>Option 4:</label>
        <input
          type="text"
          name="option4"
          value={question.option4}
          onChange={handleInputChange}
          required
        />
        <label>Correct Answer:</label>
        <input
          type="text"
          name="correctAnswer"
          value={question.correctAnswer}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateQuestion;
