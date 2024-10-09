import "./leftBar.scss";
import CleanCode from "../../assets/1.png";
import LeaderBoard from "../../assets/2.png";
import Setting from "../../assets/5.png";

import { Link } from "react-router-dom";

const LeftBar = () => {
  // const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div> */}
          <div className="item">
          <Link to="/clean">
            <img src={CleanCode} alt="" />
            <span>Clean code</span>
          </Link>
          </div>
          <div className="item">
            <img src={LeaderBoard} alt="" />
            <span>Leader Board</span>
          </div>
          <div className="item">
          <Link to="/chat" className="item">
            <img src={Setting} alt="" />
            
          </Link>
          <span>Community</span>
          </div>
          <div className="item">
            <img src={Setting} alt="" />
            <span>Answer Feadback</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;