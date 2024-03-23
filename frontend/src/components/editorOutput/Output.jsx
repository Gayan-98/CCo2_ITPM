import React, { useState } from 'react';
import { executeCode } from "../../api/codeEditorApi";
import './output.scss';

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      alert("An error occurred. " + (error.message || "Unable to run code"));
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
          Run Code
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
