import { useState } from "react";
import "./Home.css";
import LogoImg from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const [Name, setName] = useState("");
  const [Difficulty, setDifficulty] = useState("1");
  const navigate = useNavigate();

  function handleStartButtonClick() {
    if (!Name) {
      alert("Please enter your name.");
    } else {
      navigate("/game", { state: { name: Name, diff: Difficulty } });
    }
  }

  return (
    <>
      <div id="home">
        <div id="home__container">
          <div id="home__container__logoimage">
            <img src={LogoImg} height="100px" alt="logo" />
            <h1>Fastest Fingers</h1>
          </div>
          <br />
          <hr />
          <div id="home__container__inputbox">
            <input
              id="home__container__namebox"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <select
              id="home__container__selectdiff"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="1">Easy Level</option>
              <option value="1.5">Medium Level</option>
              <option value="2">Hard Level</option>
            </select>
            <br />
            <button
              id="home__container__startbutton"
              onClick={handleStartButtonClick}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
