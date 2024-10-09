import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./attemptQuiz.scss";

const Attempt = () => {
  const [agreed, setAgreed] = useState(false);
  const [code, setCode] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/advance_quizzes/get"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAgree = () => {
    setAgreed(true);
  };

  const handleAttempt = () => {
    // Logic to handle attempt
    console.log("Attempt button clicked");
    console.log("Code submitted:", code);
  };

  // const handleCodeChange = (event) => {
  //   setCode(event.target.value);
  // };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="attempt-container">
      {!agreed && (
        <div className="terms-container">
          <h2>Exam Terms and Conditions</h2>
          <p>
            By proceeding with this exam, you acknowledge that you have a total
            of 30 minutes to complete it. You are required to carefully read
            each question and provide accurate answers within the allotted time.
            Any attempt to cheat or manipulate the exam process will result in
            disqualification. Upon clicking the "Attempt" button, you agree to
            abide by the terms and conditions set forth in this agreement.
          </p>
          <p>
            You can write the code in your own IDE, but make sure to paste your
            code in CCo2 IDE.
          </p>
          <h3>Instructions:</h3>
          <ul>
            <li>Read the question carefully.</li>
            <li>Write your code solution in the provided text editor.</li>
            <li>Paste your code in CCo2 IDE.</li>
            <li>Click the "Attempt" button to submit your answer.</li>
          </ul>
          <div className="agree-checkbox">
            <input type="checkbox" id="agreeCheckbox" onChange={handleAgree} />
            <label htmlFor="agreeCheckbox">
              I agree to the terms and conditions
            </label>
          </div>
        </div>
      )}
      {agreed && (
        <div>
          <h3>Questions</h3>
          <div className="quiz-container">
            {quizzes.map((quiz, index) => (
              <div key={index} className="quiz-card">
                <h4>Question {index + 1}</h4>
                <p> {quiz.question}</p>

                <Link to="/SubmitQuiz">
                  <button className="button" onClick={handleAttempt}>
                    Attempt
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attempt;
