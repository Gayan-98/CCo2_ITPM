import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cleancodes.scss'; // Import SCSS file for styling

const CleanCode = () => { // Rename the function to start with an uppercase letter
    const [feedback, setFeedback] = useState('');

    useEffect(() => { // Use useEffect inside a React function component
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/bot/code/663a9b58c0aca87d8bd323ed`);
            setFeedback(response.data); // Set feedback to response data
            console.log(response.data); // Log the response data
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    return (
        <div className="display-container"> {/* Apply container class */}
            <div>
                {/* Render the feedback */}
                <pre className="feedback">
                    <code className="language-java">
                        {feedback}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CleanCode; // Export the component with the corrected name
