import React from "react";
import { Link } from "react-router-dom";
import "./editProfile.scss";
import warning from "../../assets/warning.png";

const EditProfile = () => {
  return (
    <div className="card">
      <div className="top">
        <div className="profile-form">
          <h2>Edit Profile</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" id="password" name="password" />
            </div>
            <div className="button-container">
              <button type="submit">Save Changes</button>
            </div>
          </form>
        </div>
        <div className="delete-container">
          <h2>Delete Profile</h2>
          <div className="warning-container">
            
            <p className="delete-warning">
              <strong>
              <img src={warning} alt="Warning" className="warning-icon" /> You will lose access to your CCo2 account once your deletion request has been submitted. 
              </strong>
            </p>
          </div>
          <div className="button-container">
            <button type="button" className="btn-danger">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
