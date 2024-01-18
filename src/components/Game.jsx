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
  const difficulty = Number(Data.state.diff);

  const { selectedWord: initialWord, selectedTime: initialTime } =
    selectWord(difficulty);

  const navigate = useNavigate(); //Route between pages

  const timerRef = useRef(null);
  const wordInputRef = useRef(null);
  const gameOverRef = useRef(null);

  // State variables
  const [score, setScore] = useState(0);
  const [gameNum, setGameNum] = useState(1);
  const [time, setTime] = useState(initialTime);
  const [word, setWord] = useState(initialWord);
  const [diffFactor, setDiffFactor] = useState(difficulty);
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

  function selectWord(diffFactor) {
    const words = {
      1: easyWords,
      1.5: mediumWords,
      2: hardWords,
    };

    const roundedDiffFactor =
      diffFactor >= 1 && diffFactor < 1.5
        ? 1
        : diffFactor >= 1.5 && diffFactor < 2
        ? 1.5
        : 2;

    const selectedWord =
      words[roundedDiffFactor][
        Math.floor(Math.random() * words[roundedDiffFactor].length)
      ];
    const selectedTime =
      roundedDiffFactor === 1
        ? selectedWord.length
        : roundedDiffFactor === 1.5
        ? Math.floor(selectedWord.length / 1.5)
        : Math.floor(selectedWord.length / 2);

    return { selectedWord, selectedTime };
  }

  // function to get a new word based on difficulty
  function newWord() {
    setUserInput("");
    const { selectedWord, selectedTime } = selectWord(diffFactor);
    console.log(selectedWord, selectedTime, diffFactor);
    setWord(selectedWord);
    setTime(selectedTime);
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
  //function to handle Game Over
  const handleGameOver = () => {
    setGameScoreArr((prevGameScoreArr) => [...prevGameScoreArr, score]);
    gameOverRef.current.style.display = "flex";
    timerRef.current.style.display = "none";
    wordInputRef.current.disabled = true;
    setDiffFactor(difficulty);
    setButtonDisabled(false);
  };

  // ---Timer---
  useEffect(() => {
    let intervalId = setInterval(() => {
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
      setDiffFactor(diffFactor + 0.01);
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
        <Header score={score} name={Data.state.name} diff={diffFactor} />
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
