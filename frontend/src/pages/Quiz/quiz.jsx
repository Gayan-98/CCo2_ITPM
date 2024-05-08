import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/random');
        setQuizData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    }
    fetchData();
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer('');
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmitAnswer = () => {
    // Handle submitting the selected answer
    // For example, you can send it to the server or store it locally
    console.log('Selected answer:', selectedAnswer);
  };

  const currentQuiz = quizData[currentQuestionIndex];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <p style={{ color: 'red' }}>Please select the answers</p>
            <div
              style={{
                backgroundColor: '#fbece3',
                margin: '5%',
                padding: '10%',
                borderRadius: '20px',
              }}
            >
              {currentQuiz && (
                <>
                  <h1>{currentQuiz.question}</h1>
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="answer"
                        value="option1"
                        checked={selectedAnswer === 'option1'}
                        onChange={handleAnswerChange}
                      />
                      {currentQuiz.option1}
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="answer"
                        value="option2"
                        checked={selectedAnswer === 'option2'}
                        onChange={handleAnswerChange}
                      />
                      {currentQuiz.option2}
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="answer"
                        value="option3"
                        checked={selectedAnswer === 'option3'}
                        onChange={handleAnswerChange}
                      />
                      {currentQuiz.option3}
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="answer"
                        value="option4"
                        checked={selectedAnswer === 'option4'}
                        onChange={handleAnswerChange}
                      />
                      {currentQuiz.option4}
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
          <button onClick={handleNextQuestion}>Next</button>
          {currentQuestionIndex === quizData.length - 1 && (
            <button onClick={handleSubmitAnswer}>Submit</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
