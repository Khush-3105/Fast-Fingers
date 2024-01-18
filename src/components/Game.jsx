// Imports
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
    initialWord = easyWords[Math.floor(Math.random() * easyWords.length)];
    initialTime = initialWord.length;
  } else if (difficulty === "Medium") {
    initialWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
    initialTime = Math.floor(initialWord.length / 1.5);
  } else if (difficulty === "Hard") {
    initialWord = hardWords[Math.floor(Math.random() * hardWords.length)];
    initialTime = Math.floor(initialWord.length / 2);
  }

  const navigate = useNavigate(); //Route between pages

  const timerRef = useRef(null);
  const wordInputRef = useRef(null);
  const gameOverRef = useRef(null);

  // State variables
  const [score, setScore] = useState(0);
  const [gameNum, setGameNum] = useState(1);
  const [time, setTime] = useState(initialTime);
  const [word, setWord] = useState(initialWord);
  const [gameScoreArr, setGameScoreArr] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  // ---Score Board---

  //Rendering the list of scores
  const listItems = gameScoreArr.map((gameScoreArr, index) => (
    <li className="game__screen__right__scoreboardlist" key={index}>
      Game {index + 1}: {gameScoreArr}
    </li>
  ));

  // function to get a new word based on difficulty
  function newWord() {
    setUserInput("");
    if (difficulty === "Easy") {
      let temp = easyWords[Math.floor(Math.random() * easyWords.length)];
      setWord(temp);
      setTime(temp.length);
    } else if (difficulty === "Medium") {
      let temp = mediumWords[Math.floor(Math.random() * mediumWords.length)];
      setWord(temp);
      setTime(Math.floor(temp.length / 1.5));
    } else if (difficulty === "Hard") {
      let temp = hardWords[Math.floor(Math.random() * hardWords.length)];
      setWord(temp);
      setTime(Math.floor(temp.length / 2));
    }
  }

  // function to handle play again
  function handlePlayAgain() {
    setGameNum(gameNum + 1);
    timerRef.current.style.display = "flex";
    gameOverRef.current.style.display = "none";
    newWord();
    setScore(0);
    wordInputRef.current.disabled = false;
    wordInputRef.current.focus();
    wordInputRef.current.value = "";
    setButtonDisabled(true);
  }

  // ---Timer---
  useEffect(() => {
    let intervalId;

    //function to handle Game Over
    const handleGameOver = () => {
      setGameScoreArr((gameScoreArr) => [...gameScoreArr, score]);
      gameOverRef.current.style.display = "flex";
      timerRef.current.style.display = "none";
      wordInputRef.current.disabled = true;
      setButtonDisabled(false);
    };

    intervalId = setInterval(() => {
      if (time === 0) {
        clearInterval(intervalId);
        handleGameOver();
      } else {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]); // Include time as a dependency

  //function for handling user input
  function handleInput(input) {
    setUserInput(input);
    if (input === word) {
      newWord();
      setScore(score + 1);
      wordInputRef.current.value = "";
    }
  }

  //function to change the word color and compare with user input
  const getLetterClass = (letter, index) => {
    let colorStatus = 0;
    if (index <= userInput.length - 1) {
      colorStatus = letter === userInput[index].toLowerCase() ? 1 : -1;
    }
    let letterClass = "";
    switch (colorStatus) {
      case 1:
        letterClass = "--correct";
        break;
      case -1:
        letterClass = "--wrong";
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
        <Header score={score} />
        <div className="game__screen">
          <div id="game__screen__left">
            <div id="game__screen__left__gamenumber">Game {gameNum}</div>
            <div id="game__screen__left__timer" ref={timerRef}>
              0{time}
            </div>
            <div id="game__screen__left__gameover" ref={gameOverRef}>
              Game Over Score: {score}
            </div>
            <br />
            <div id="game__screen__left__gameword">
              {" "}
              {word.split("").map((letter, index) => {
                const letterClass = getLetterClass(letter, index);
                return (
                  <h1 key={index} className={`gameword__letter${letterClass}`}>
                    {letter}
                  </h1>
                );
              })}
            </div>
            <input
              id="game__screen__left__wordinput"
              ref={wordInputRef}
              onChange={(e) => handleInput(e.target.value)}
              autoFocus
            />
            <button
              id="game__screen__left__playagainbutton"
              disabled={isButtonDisabled}
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
            <br />
            <button
              id="game__screen__left__quitgamebutton"
              onClick={() => {
                navigate("/");
              }}
            >
              Quit Game
            </button>
          </div>
          <div id="game__screen__right">
            <div id="game__screen__right__scoreboard">
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
