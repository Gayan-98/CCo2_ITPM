import React, { useState, useEffect } from "react";
import "./userProfile.scss";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  useEffect(() => {
    // Load profile picture from localStorage when component mounts
    const storedPicture = localStorage.getItem("profilePicture");
    if (storedPicture) {
      setProfilePicture(storedPicture);
    }
  }, []);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const pictureDataUrl = reader.result;
      setProfilePicture(pictureDataUrl);
      // Save profile picture to localStorage
      localStorage.setItem("profilePicture", pictureDataUrl);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePicture = () => {
    setProfilePicture(null);
    // Remove profile picture from localStorage
    localStorage.removeItem("profilePicture");
    // Additional logic to delete the profile picture from backend if necessary
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <div className="user-profile__header__name">
          <h1>USER PROFILE</h1>
        </div>
        <div className="user-profile__header__picture">
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          <label htmlFor="profilePicture">
            {profilePicture ? (
              <>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
                <button
                  onClick={handleDeleteProfilePicture}
                  className="delete-profile-picture-button"
                >
                  Delete
                </button>
              </>
            ) : (
              <div className="profile-picture-placeholder"></div>
            )}
            Upload Picture
          </label>
        </div>
      </div>
      <div className="user-profile__body">
        <div className="user-profile__body__greeting"><h3>Welcome Emily!!!</h3></div>
        <div className="user-profile__body__info">
          <div className="user-profile__body__info__title">
            USER INFORMATION
          </div>
          <div className="user-profile__body__info__details">
            <div className="user-profile__body__info__details__row">
              <div className="user-profile__body__info__details__row__label">
                Username
              </div>
              <div className="user-profile__body__info__details__row__value">
                emily1
              </div>
            </div>
            <div className="user-profile__body__info__details__row">
              <div className="user-profile__body__info__details__row__label">
                Email address
              </div>
              <div className="user-profile__body__info__details__row__value">
                emily@abc.com
              </div>
            </div>
            <div className="user-profile__body__info__details__row">
              <div className="user-profile__body__info__details__row__label">
                Level
              </div>
              <div className="user-profile__body__info__details__row__value">
                Beginner
              </div>
            </div>
            <div className="user-profile__body__info__details__row">
              <div className="user-profile__body__info__details__row__label">
                Password
              </div>
              <div className="user-profile__body__info__details__row__value">
                {showPassword ? "emily123" : "********"}
                <span
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="user-profile__body__actions">
          <Link to="/editProfile" className="item">
            <button className="user-profile__body__actions__edit">
              Edit profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;