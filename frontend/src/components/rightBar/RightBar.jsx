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

    const intervalId = setInterval(updateStoredData, 20); 
    setRefreshInterval(intervalId);
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
       
          <div className="user">
            <div className="userInfo">
            <li>{storedData}</li>
             
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
