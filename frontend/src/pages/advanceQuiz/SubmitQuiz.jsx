import React, { useState } from 'react';
import './SubmitQuiz.scss'; // Import SCSS file for styling
import CodeEditor from '../../components/codeEditor/CodeEditor';
import DisplayQuiz from './displayQuiz';
import axios from 'axios';

const SubmitQuiz = () => {
    const [codeEditorWidth, setCodeEditorWidth] = useState('70%'); 

    const handleDividerClick = () => {
       
        setCodeEditorWidth(codeEditorWidth === '50%' ? '100%' : '50%');
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/code/measure', {
                userId: '1',
                quizId: '6634fe09cdf95b109fac3c9b',
                code: "java code"
            });

            console.log('Submission successful:', response.data);

            alert('Code submitted successfully!');
        } catch (error) {
            console.error('Error submitting code:', error);
            alert('An error occurred while submitting code.');
        }
    };

    return (
        <div className="resizable-page">
            <div className="resizable-column">
                <DisplayQuiz />
            </div>
            <div className="divider" onClick={handleDividerClick}></div>
            <div className="resizable-column" style={{ width: codeEditorWidth }}>
                <CodeEditor />
            </div>
            <div className="submit-button-container">
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default SubmitQuiz;
