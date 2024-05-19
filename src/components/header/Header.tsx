import LogoImg from "../../assets/logo1.png";
import Userimg from "../../assets/user.png";
import Levelimg from "../../assets/gamelevel.png";
import Scoreimg from "../../assets/score.png";
import Wordimg from "../../assets/word.png";
import "./Header.css";

function Header(props: {
  name: string;
  diff: number;
  score: {
    time: number;
    wordCount: number;
  };
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
            alt="logo"
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
              alt="user"
            />
            {props.name}
            <br />
            <img
              src={Levelimg}
              className="headerimg"
              height="30px"
              color="white"
              alt="level"
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
              alt="score"
              height="30px"
              color="white"
            />
            Score: {props.score.time} s
            <br />
            <img
              src={Wordimg}
              className="headerimg"
              height="30px"
              color="white"
            />
            Words: {props.score.wordCount}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
