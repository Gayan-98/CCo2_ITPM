import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './codeMetricsTable .scss';

const CodeMetricsTable = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    //   const response = await axios.get('http://localhost:8080/api/code/user/${localStorage.getItem("userId")}'); 
      const response = await axios.get('http://localhost:8080/api/code/user/6623442c9058ee2d8e066db8'); 
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAttempt = (answerId) => {    
    console.log(answerId);
    localStorage.setItem("answerid", answerId);
};


  return (
    <div className="code-metrics-table">
      <table>
        <thead>
          <tr>
            {/* <th>Quiz ID</th> */}
            <th>Code</th>
            <th>Lines of Code</th>
            <th>Duplicate Code Blocks</th>
            <th>Max Nesting Depth</th>
            <th>Estimated Time Complexity</th>
            <th>Estimated Space Complexity</th>
            <th>Control Flow Complexity</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map(metric => (
            <tr key={metric.id}>
              {/* <td>{metric.quiId}</td> */}
              <td>{metric.code}</td>
              <td>{metric.linesOfCode}</td>
              <td>{metric.duplicateCodeBlocks}</td>
              <td>{metric.maxNestingDepth}</td>
              <td>{metric.estimatedTimeComplexity}</td>
              <td>{metric.estimatedSpaceComplexity}</td>
              <td>{metric.controlFlowComplexity}</td>
              <td>
              <Link to="/feedback">
                <button onClick={() => handleAttempt(metric.id)}>Feedback</button>
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeMetricsTable;
