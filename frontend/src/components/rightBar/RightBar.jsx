import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
       
          <div className="user">
            <div className="userInfo">
            
            
            </div>
            <div className="buttons">
              <button>More Suggestion</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>


        
        <div className="item">
          <span>More Explanation</span>
      
         
       
      
        </div>
      
      </div>
    </div>
  );
};

export default RightBar;
