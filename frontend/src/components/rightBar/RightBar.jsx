import React, { useState, useEffect } from 'react';
import './rightBar.scss';

const RightBar = () => {
  const [storedData, setStoredData] = useState(localStorage.getItem('outputData'));
  const [refreshInterval, setRefreshInterval] = useState(null);

  useEffect(() => {
    const updateStoredData = () => {
      setStoredData(localStorage.getItem('outputData'));
    };

    updateStoredData();

    const intervalId = setInterval(updateStoredData, 20); // Setting interval for every 20ms
    setRefreshInterval(intervalId); // Store intervalId

    // Clean up interval when the component unmounts
    return () => {
      clearInterval(intervalId); // Use intervalId for cleanup, not refreshInterval
    };
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <li>{storedData}</li> {/* Display the stored data */}
            </div>
          </div>
        </div>
        <div className="buttons">
          <button>More Suggestion</button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
