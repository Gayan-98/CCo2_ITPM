import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './displayQuiz.scss'; // Import SCSS file

const DisplayQuiz = () => {
    const [question, setQuestion] = useState('');

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/advance_quizzes/get/66073acd2b83ed3953c37dd1");
            setQuestion(response.data.question);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    return (
        <div className="display-container"> {/* Apply container class */}
            <div>
                <h2 className="question-heading">Question:</h2>
                <p className="question-text">{question}</p>
            </div>
        </div>
    );
};

export default DisplayQuiz;
