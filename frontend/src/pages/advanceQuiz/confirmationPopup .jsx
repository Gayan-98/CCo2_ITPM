import React from "react";
import "./confirmationPopup .scss";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-message">{message}</div>
        <div className="popup-buttons">
          <button className="popup-confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
          <button className="popup-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
