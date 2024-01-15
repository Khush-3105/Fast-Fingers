import { useState } from "react";
import "./Home.css";
import LogoImg from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const [Name, setName] = useState("");
  const [Difficulty, setDifficulty] = useState("Easy");
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
        <div id="home-container">
          <div id="home-logoimage">
            <img src={LogoImg} height="100px" alt="logo" />
            <h1>Fastest Fingers</h1>
          </div>
          <br />
          <hr />
          <div id="home-inputbox">
            <input
              id="home-namebox"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <select
              id="home-selectdiff"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Easy">Easy Level</option>
              <option value="Medium">Medium Level</option>
              <option value="Hard">Hard Level</option>
            </select>
            <br />
            <button id="home-startbutton" onClick={handleStartButtonClick}>
              Start Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
