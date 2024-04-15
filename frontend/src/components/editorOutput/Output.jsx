import React, { useState } from 'react';
import { executeCode } from "../../api/codeEditorApi";
import './output.scss';

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [runClicked, setRunClicked] = useState(false); // State to track if Run button has been clicked
  const [submitClicked, setSubmitClicked] = useState(false); // State to track if Submit button has been clicked

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      // Set Run button clicked state to true
      setRunClicked(true);
    } catch (error) {
      console.log(error);
      alert("An error occurred. " + (error.message || "Unable to run code"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    // Handle submission logic
    setSubmitClicked(true);
    // Add your submission logic here
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
        {/* Enable submit button only after Run button has been clicked */}
        <button
          className={`submit-code-button ${!runClicked ? 'disabled' : ''}`}
          onClick={handleSubmit}
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
