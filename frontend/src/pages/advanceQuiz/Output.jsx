import React, { useState, useEffect } from "react";
import { executeCode } from "../../api/codeEditorApi";
import axios from "axios";
import "./output.scss";
import Popup from "./popup"; // Import your Popup component

const Output = ({ editorRef, language, onResponse }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [runClicked, setRunClicked] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission status

  const runCode = async () => {
    const selectedLanguage = language.toLowerCase(); // Convert language to lowercase for case-insensitive comparison
    if (selectedLanguage !== "java") {
      setValidationError("You must provide Java code.");
      return;
    }

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      setValidationError("Please provide code in the IDE.");
      return;
    }

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(selectedLanguage, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      setRunClicked(true);

      const response = await axios.post(
        "http://localhost:8080/api/code/measure",
        {
          userId: localStorage.getItem("userId"),
          quizId: localStorage.getItem("Qid"),
          code: sourceCode,
        }
      );

      console.log(response.data);

      localStorage.setItem("outputData", JSON.stringify(response.data));

      if (typeof onResponse === "function") {
        onResponse(response.data);
      }

      setTimeout(() => {
        localStorage.removeItem("outputData");
      }, 40000);

      // Update state to indicate successful submission
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error running code or sending code to backend:", error);
      alert(
        "An error occurred. " +
          (error.message || "Unable to run code or send to backend")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="output-container">
      <div className="output-header">
        <div className="output-title">Output</div>
        <button
          className={`run-code-button ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
          onClick={runCode}
        >
          Run
        </button>
        <button className={`submit-code-button ${isSubmitted ? "submitted" : ""}`} onClick={runCode} disabled={isSubmitted}>
          {isSubmitted ? "Submitted" : "Submit"}
        </button>
      </div>
      {validationError && <Popup message={validationError} onClose={() => setValidationError("")} />}
      <div className={`output-content ${isError ? "error" : ""}`}>
        {output
          ? output.map((line, i) => <div key={i}>{line}</div>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
