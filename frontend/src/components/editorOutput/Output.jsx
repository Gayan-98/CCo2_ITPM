import React, { useState } from 'react';
import { executeCode } from "../../api/codeEditorApi";
import axios from 'axios';
import './output.scss';

const Output = ({ editorRef, language, onResponse }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [runClicked, setRunClicked] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      setRunClicked(true);
      
      // Send code snippet to backend
      const response = await axios.post('http://localhost:8080/bot/chat', sourceCode, {
        headers: {
          'Content-Type': 'text/plain' // Set content type as text/plain
        }
      });
  console.log(response.data);
      // Check if onResponse prop is a function before calling it
      if (typeof onResponse === 'function') {
        onResponse(response.data);
      }
    } catch (error) {
      console.error('Error running code or sending code to backend:', error);
      alert("An error occurred. " + (error.message || "Unable to run code or send to backend"));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="output-container">
      <div className="output-header">
        <div className="output-title">Output</div>
        <button
          className={`run-code-button ${isLoading ? 'loading' : ''}`}
          onClick={runCode}
          disabled={isLoading}
        >
          Run
        </button>
        <button
          className={`submit-code-button ${!runClicked ? 'disabled' : ''}`}
          onClick={() => setSubmitClicked(true)}
          disabled={!runClicked || submitClicked}
        >
          Submit
        </button>
      </div>
      <div
        className={`output-content ${isError ? 'error' : ''}`}
      >
        {output
          ? output.map((line, i) => <div key={i}>{line}</div>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};
export default Output;
