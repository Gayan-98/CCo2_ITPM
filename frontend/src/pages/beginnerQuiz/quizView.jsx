import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './quizView.scss';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Error fetching categories');
      }
      setLoading(false);
    };
   
    fetchCategories();
    const storedCategoryId = localStorage.getItem('selectedId');
    if (storedCategoryId) {
      setSelectedCategory(storedCategoryId);
    }
  }, []); 

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8080/categories/${selectedCategory}/questions`);
        setQuestions(response.data);
      } catch (error) {
        setError('Error fetching questions');
      }
      setLoading(false);
    };

    if (selectedCategory) {
      fetchQuestions();
    }
  }, [selectedCategory]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      localStorage.setItem('selectedId', value);
      setSelectedCategory(value);
    }
  };

  const handleDeleteQuestion = (id) => {
    axios.delete(`http://localhost:8080/questions/${id}`)
      .then(response => {
        setQuestions(questions.filter(question => question.id !== id));
        console.log('Question deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting question:', error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="questions-list-container">
      <label>Select Category:</label>
      <select
        name="category"
        value={selectedCategory}
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
      <h2>Questions List</h2>
      <table className="questions-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Options</th>
            <th>Correct Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.id}>
              <td>{question.question}</td>
              <td>
                <ul className="options-list">
                  <li>{question.option1}</li>
                  <li>{question.option2}</li>
                  <li>{question.option3}</li>
                  <li>{question.option4}</li>
                </ul>
              </td>
              <td>{question.correctAnswer}</td>
              <td>
                <button onClick={() => handleDeleteQuestion(question.id)} className="btn-delete">Delete</button>
                <Link to={`/quizEdit/${question.id}`} className="btn-update">Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsList;
