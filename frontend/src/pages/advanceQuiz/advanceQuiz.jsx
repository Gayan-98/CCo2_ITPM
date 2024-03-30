import React, { useState } from 'react';
import './advanceQuiz.scss';
import axios from 'axios'; // Import Axios for making HTTP requests

const AdvanceQuiz = () => {
  const [quiz, setQuiz] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:8080/api/advance_quizzes/post', {
        question: quiz,
        answer: answer
      });

      // Handle successful response (if needed)
      console.log('Quiz added successfully:', response.data);

      // Reset form fields after successful submission
      setQuiz('');
      setAnswer('');
    } catch (error) {
      // Handle error (if needed)
      console.error('Error adding quiz:', error);
    }
  };

  return (
    <div className="advance-quiz-container">
      <h2>Add Quiz for Expert</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="quiz">Quiz:</label>
          <textarea
            id="quiz"
            name="quiz"
            value={quiz}
            onChange={(e) => setQuiz(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <textarea            
            id="answer"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AdvanceQuiz;
