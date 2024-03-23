import React, { useRef, useState } from 'react';
import { Editor } from "@monaco-editor/react";

import './codeEditor.scss';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);

  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-wrapper">
        <div className="language-selector-wrapper">


        </div>
        <div className="editor-wrapper">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
      </div>
      <div className="output-wrapper">


      </div>
    </div>
  );
};

export default CodeEditor;
