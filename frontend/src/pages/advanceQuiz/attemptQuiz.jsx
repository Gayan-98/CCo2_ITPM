import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './attemptQuiz.scss';

const Attempt = () => {
    
    const [agreed, setAgreed] = useState(false);
    const [code, setCode] = useState('');

    

    

    const handleAgree = () => {
        setAgreed(true);
    };

    const handleAttempt = () => {
        // Logic to handle attempt
        console.log('Attempt button clicked');
        console.log('Code submitted:', code);
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    return (
        <div className="attempt-container"> {/* Apply container class */}
            <h2>Exam Terms and Conditions</h2>
            <br/>
            <p>
                By proceeding with this exam, you acknowledge that you have a total of 30 minutes to complete it.
                You are required to carefully read each question and provide accurate answers within the allotted time.
                Any attempt to cheat or manipulate the exam process will result in disqualification.
                Upon clicking the "Attempt" button, you agree to abide by the terms and conditions set forth in this agreement.
            </p>
            <p className='ide-condi'>
                You can write the code your own IDE but make sure it is must to pase you code in CCo2 IDE
            </p>
            <div className="agree-checkbox"> {/* Apply checkbox class */}
                <input type="checkbox" id="agreeCheckbox" onChange={handleAgree} />
                <label htmlFor="agreeCheckbox">I agree to the terms and conditions</label>
            </div>
            {agreed && (
               
               <Link to="/SubmitQuiz"> 
               <button className="button" onClick={handleAttempt}>Attempt</button>
           </Link>
             
            )}
        </div>
    );
};

export default Attempt;
