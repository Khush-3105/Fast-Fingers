import LogoImg from "../assets/logo1.png";
import Userimg from "../assets/user.png";
import Levelimg from "../assets/gamelevel.png";
import Scoreimg from "../assets/score.png";
import "../styles/Header.css";

function Header(props: {
  name: string;
  diff: number;
  scoreTime: number;
  scoreWordCount: number;
}) {
  return (
    <>
      <div className="game__header">
        <div>
          <img
            src={LogoImg}
            className="headerimg"
            height="30px"
            color="white"
          />
          Fast Fingers
        </div>
        <div id="game__header__userdetails">
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

          <div className="headerbox">
            <img
              src={Scoreimg}
              className="headerimg"
              height="30px"
              color="white"
            />
            Score: {props.scoreTime} s
            <br />
            <img
              src={Scoreimg}
              className="headerimg"
              height="30px"
              color="white"
            />
            Words: {props.scoreWordCount}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
