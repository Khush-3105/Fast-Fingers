import LogoImg from "../assets/logo1.png";
import Userimg from "../assets/user.png";
import Levelimg from "../assets/gamelevel.png";
import Scoreimg from "../assets/score.png";
import "./Header.css";

function Header(props) {
  return (
    <>
      <div className="game__header">
        <div id="game__headerleft">
          <div className="headerbox">
            <img
              src={Userimg}
              className="headerimg"
              height="30px"
              color="white"
            />
            {props.name}
            <br />
            <img
              src={Levelimg}
              className="headerimg"
              height="30px"
              color="white"
            />
            {props.diff >= 1 && props.diff < 1.5
              ? "Easy"
              : props.diff >= 1.5 && props.diff < 2
              ? "Medium"
              : "Hard"}{" "}
            Level
          </div>
        </div>
        <div id="game__headerright">
          <div className="headerbox">
            <img
              src={LogoImg}
              className="headerimg"
              height="30px"
              color="white"
            />
            Fast Fingers
            <br />
            <img
              src={Scoreimg}
              className="headerimg"
              height="30px"
              color="white"
            />
            Score: {props.score}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
