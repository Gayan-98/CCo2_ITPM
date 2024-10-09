import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignout = () => {
    // Clear username from localStorage and set it to an empty string
    localStorage.removeItem("username");
    setUsername("");
    // Other signout logic (e.g., redirecting to login page)
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>CCo2-clean code Oxygen</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
      </div>
     
      <div className="right">
        <div className="username" onClick={() => setShowDropdown(!showDropdown)}>
          <PersonOutlinedIcon />
          <span>Hi ! {username}</span>
        </div>
        {/* Dropdown menu */}
        {showDropdown && (
          <div className="dropdown">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div className="dropdown-item">
                <PersonOutlinedIcon />
                <span>Profile</span>
              </div>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="dropdown-item" onClick={handleSignout}>
              <ExitToAppOutlinedIcon />
              <span>Sign out</span>
            </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
