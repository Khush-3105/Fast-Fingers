import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Game.css";
import Header from "./Header.tsx";
import useGame from "../services/useGame.tsx";
import getLetterClass from "../services/getLetterClass.tsx";
import { useRef } from "react";

function Game() {
  const navigate = useNavigate();
  const Data = useLocation();
  const difficulty: number = Number(Data.state.diff);

  //Route between pages

  const timerRef = useRef<HTMLDivElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);
  const gameOverRef = useRef<HTMLDivElement>(null);

  const {
    time,
    word,
    listItems,
    gameNum,
    userInput,
    isButtonDisabled,
    scoreTime,
    scoreWordCount,
    diffFactor,

    handlePlayAgain,
    handleInput,
  } = useGame(timerRef, wordInputRef, gameOverRef, difficulty);

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
