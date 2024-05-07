//import './Quiz.scss'; 
//import quizBackground from '../../assets/quizBackground.jpg'; // Adjust the path accordingly
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the database
    axios.get('YOUR_API_ENDPOINT')
      .then(response => {
        setQuestions(response.data); //the response contains an array of questions
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleDeleteQuestion = (id) => {
    // Send a DELETE request to backend API
    axios.delete(`YOUR_API_ENDPOINT/${id}`)
      .then(response => {
        // Remove the deleted question from the local state
        setQuestions(questions.filter(question => question.id !== id));
        console.log('Question deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting question:', error);
      });
  };
  

  return (
    <div>
      <h2>Questions List</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Option 1</th>
            <th>Option 2</th>
            <th>Option 3</th>
            <th>Option 4</th>
            <th>Correct Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.id}>
              <td>{question.Question}</td>
              <td>{question.option1}</td>
              <td>{question.option2}</td>
              <td>{question.option3}</td>
              <td>{question.option4}</td>
              <td>{question.correctAnswer}</td>
              <td>
                <Link to={`/quiz-edit/${question.id}`} className="btn-edit">Edit</Link>
                <button onClick={() => handleDeleteQuestion(question.id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsList;
