import React from "react";
import "./popup.scss";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-message">{message}</div>
        <button className="popup-close-btn" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Popup;
