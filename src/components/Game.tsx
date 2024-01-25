import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Game.css";
import Header from "./Header.tsx";
import useGame from "../services/useGame.tsx";
import ScoreBoard from "./ScoreBoard.tsx";
import getLetterClass from "../services/getLetterClass.tsx";
import { useEffect, useRef, useState } from "react";

function Game() {
  const navigate = useNavigate();
  const Data = useLocation();

  const difficulty: number = Number(Data.state.diff) || 1;

  const timerRef = useRef<HTMLDivElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);
  const gameOverRef = useRef<HTMLDivElement>(null);

  const [gameNum, setGameNum] = useState<number>(1);
  const [userInput, setUserInput] = useState<string>("");
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [gameScoreArr, setGameScoreArr] = useState<
    Array<{
      score: number;
      wordCount: number;
    }>
  >([]);
  const {
    time,
    word,
    diffFactor,
    scoreTime,
    scoreWordCount,
    gameOver,
    newWord,
    gameRestart,
  } = useGame({
    difficulty,
  });

  useEffect(() => {
    if (gameOver) {
      handleGameOver();
    }
  }, [gameOver]);

  function handleGameOver() {
    setGameScoreArr((prevGameScoreArr) => [
      ...prevGameScoreArr,
      { score: scoreTime, wordCount: scoreWordCount },
    ]);
    gameOverRef.current!.style.display = "flex";
    timerRef.current!.style.display = "none";
    wordInputRef.current!.disabled = true;
    wordInputRef.current!.value = "";
    setButtonDisabled(false);
  }

  function handlePlayAgain() {
    setGameNum(gameNum + 1);
    timerRef.current!.style.display = "flex";
    gameOverRef.current!.style.display = "none";
    wordInputRef.current!.disabled = false;
    wordInputRef.current?.focus();
    setButtonDisabled(true);
    console.log(diffFactor, difficulty);
    setUserInput("");
    gameRestart();
    newWord();
  }

  function handleInput(input: string) {
    setUserInput(input);
    if (input === word) {
      setUserInput("");
      wordInputRef.current!.value = "";
      newWord();
    }
  }

  return (
    <>
      <div id="game">
        <Header
          scoreTime={scoreTime}
          scoreWordCount={scoreWordCount}
          name={Data.state.name}
          diff={diffFactor}
        />
        <div className="game__screen">
          <div id="game__screen__left">
            <div id="game__screen__left__gamenumber">Game {gameNum}</div>
            <div id="game__screen__left__timer" ref={timerRef}>
              <div id="game__screen__left__timer__time">0{time}</div>
              <progress
                id="game__screen__left__timer__progressbar"
                value={time}
                max={word.length}
              />
            </div>
            <div id="game__screen__left__gameover" ref={gameOverRef}>
              <div id="game__screen__left__gameover__text">Game Over</div>
              Score: {scoreTime} s
              <br />
              Words: {scoreWordCount}
            </div>
            <div id="game__screen__left__gameword">
              {word.split("").map((letter, index) => {
                const letterClass = getLetterClass(letter, index, userInput);
                return (
                  <h1 key={index} className={`gameword__letter${letterClass}`}>
                    {letter}
                  </h1>
                );
              })}
            </div>
            <input
              id="game__screen__left__wordinput"
              type="text"
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
            <ScoreBoard gameScoreArr={gameScoreArr} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
