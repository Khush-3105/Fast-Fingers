import LogoImg from "../assets/logo1.png";
import Userimg from "../assets/user.png";
import Levelimg from "../assets/gamelevel.png";
import Scoreimg from "../assets/score.png";
import { useLocation } from "react-router-dom";
import "./Header.css";

function Header(props) {
  const Data = useLocation();
  return (
    <>
      <div id="game-headerleft">
        <div className="headerbox">
          <img
            src={Userimg}
            className="headerimg"
            height="30px"
            color="white"
          />
          {Data.state.name}
        </div>
        <div className="headerbox">
          <img
            src={Levelimg}
            className="headerimg"
            height="30px"
            color="white"
          />
          {Data.state.diff} Level
        </div>
      </div>
      <div id="game-headerright">
        <div className="headerbox">
          <img
            src={LogoImg}
            className="headerimg"
            height="30px"
            color="white"
          />
          Fast Fingers
        </div>
        <div className="headerbox">
          <img
            src={Scoreimg}
            className="headerimg"
            height="30px"
            color="white"
          />
          Score: {props.score}
        </div>
      </div>
    </>
  );
}
export default Header;
