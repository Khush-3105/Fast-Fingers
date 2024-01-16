// Imports
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Game.css";
import Header from "./Header";
import easyWords from "../assets/easyWords.json";
import mediumWords from "../assets/mediumWords.json";
import hardWords from "../assets/hardWords.json";

function Game() {
  //Setting inittial Time and Word based on difficulty
  const Data = useLocation();
  const difficulty = Data.state.diff;
  let initialTime;
  let initialWord;
  if (difficulty === "Easy") {
    initialTime = 2;
    initialWord = easyWords[Math.floor(Math.random() * easyWords.length)];
  } else if (difficulty === "Medium") {
    initialTime = 4;
    initialWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
  } else if (difficulty === "Hard") {
    initialTime = 7;
    initialWord = hardWords[Math.floor(Math.random() * hardWords.length)];
  }

  const navigate = useNavigate(); //Route between pages

  // State variables
  const [Score, setScore] = useState(0);
  const [GameNum, setGameNum] = useState(1);
  const [Time, setTime] = useState(initialTime);
  const [Word, setWord] = useState(initialWord);
  const [GameScoreArr, setGameScoreArr] = useState([]);
  const [UserInput, setUserInput] = useState("");

  // ---Score Board---

  //Rendering the list of scores
  const listItems = GameScoreArr.map((GameScoreArr, index) => (
    <li className="scoreboardlist" key={index}>
      Game {index + 1}: {GameScoreArr}
    </li>
  ));

  // function to get a new word based on difficulty
  function newWord() {
    setUserInput("");
    if (difficulty === "Easy") {
      setWord(easyWords[Math.floor(Math.random() * easyWords.length)]);
    } else if (difficulty == "Medium") {
      setWord(mediumWords[Math.floor(Math.random() * mediumWords.length)]);
    } else {
      setWord(hardWords[Math.floor(Math.random() * hardWords.length)]);
    }
  }

  // function to handle play again
  function handlePlayAgain() {
    setGameNum(GameNum + 1);
    document.getElementById("timer").style.display = "flex";
    document.getElementById("gameover").style.display = "none";
    setTime(initialTime);
    newWord();
    setScore(0);
    document.getElementById("wordinput").disabled = false;
    document.getElementById("wordinput").focus();
    document.getElementById("wordinput").value = "";
  }

  // ---Timer---
  useEffect(() => {
    let intervalId;

    const decrementTime = () => {
      setTime((prevTime) => Math.max(0, prevTime - 1));
    };

    //function to handle Game Over
    const handleGameOver = () => {
      setGameScoreArr((GameScoreArr) => [...GameScoreArr, Score]);
      document.getElementById("gameover").style.display = "flex";
      document.getElementById("timer").style.display = "none";
      document.getElementById("wordinput").disabled = true;
    };

    intervalId = setInterval(() => {
      decrementTime();
      if (Time === 0) {
        clearInterval(intervalId);
        handleGameOver();
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [Time]); // Include time as a dependency

  const formatTime = (seconds) => {
    const remainingSeconds = seconds % 60;
    return `${remainingSeconds < 10 ? "0" : ""}${remainingSeconds} s`;
  };

  //function for handling user input
  function handleInput(input) {
    setUserInput(input);
    if (input === Word) {
      newWord();
      setTime(initialTime);
      setScore(Score + 1);
      document.getElementById("wordinput").value = "";
    }
  }

  //function to change the word color and compare with user input
  const getLetterClass = (letter, index) => {
    let colorStatus = 0;
    if (index <= UserInput.length - 1) {
      colorStatus = letter === UserInput[index].toLowerCase() ? 1 : -1;
    }
    let letterClass = "";
    switch (colorStatus) {
      case 1:
        letterClass = "gameword_letter-correct";
        break;
      case -1:
        letterClass = "gameword_letter-wrong";
        break;
      default:
        letterClass = "";
        break;
    }
    return letterClass;
  };

  return (
    <>
      <div id="game">
        <div className="game-header">
          <Header score={Score} />
        </div>
        <div className="game-screen">
          <div id="game-screenleft">
            <div id="gamenumber">Game {GameNum}</div>
            <div id="timer">{formatTime(Time)}</div>
            <div id="gameover">Game Over Score: {Score}</div>
            <br />
            <div id="gameword">
              {" "}
              {Word.split("").map((letter, index) => {
                const letterClass = getLetterClass(letter, index);
                return (
                  <h1 key={index} className={`gameword_letter ${letterClass}`}>
                    {letter}
                  </h1>
                );
              })}
            </div>
            <input
              id="wordinput"
              onChange={(e) => handleInput(e.target.value)}
              autoFocus
            />
            <button id="playagainbutton" onClick={handlePlayAgain}>
              Play Again
            </button>
            <br />
            <button
              id="quitgamebutton"
              onClick={() => {
                navigate("/");
              }}
            >
              Quit Game
            </button>
          </div>
          <div id="game-screenright">
            <div id="scoreboard">
              <h2>Score Board</h2>
              <hr />
              <br />
              <ul>{listItems}</ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
