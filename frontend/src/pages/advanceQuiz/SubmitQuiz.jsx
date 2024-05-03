import React, { useState } from 'react';
import './SubmitQuiz.scss'; // Import SCSS file for styling
import CodeEditor from '../../components/codeEditor/CodeEditor';
import DisplayQuiz from './displayQuiz';

const SubmitQuiz = () => {
    const [codeEditorWidth, setCodeEditorWidth] = useState('70%'); // Initial width for CodeEditor

    const handleDividerClick = () => {
        // Toggle between 50% and 100% width on click
        setCodeEditorWidth(codeEditorWidth === '50%' ? '100%' : '50%');
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
        </div>
    );
};

export default SubmitQuiz;
