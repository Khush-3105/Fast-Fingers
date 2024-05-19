import "./Game.css";
import Header from "../header/Header.tsx";
import useGame from "../../helpers/useGame.tsx";
import { Scoreboard } from "../scoreboard/Scoreboard.tsx";
import getLetterClass from "../../helpers/getLetterClass.tsx";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface GameProps {
  gameDetails: { name: string; difficulty: string };
  setgameDetails: Dispatch<
    SetStateAction<{ name: string; difficulty: string }>
  >;
}

export const Game: FC<GameProps> = ({ gameDetails, setgameDetails }) => {
  const [userInput, setUserInput] = useState<string>("");

  const {
    time,
    word,
    isGameActive,
    diffFactor,
    score,
    gameScoreArr,
    gameNum,
    gameRestart,
  } = useGame({
    difficulty: Number(gameDetails.difficulty),
    userInput: userInput,
    setUserInput: setUserInput,
  });

  return (
    <>
      <Header score={score} name={gameDetails.name} diff={diffFactor} />
      <div className="game__wrapper">
        <div className="game">
          <div className="game__round">Round {gameNum}</div>
          {isGameActive ? (
            <div className="game__timer">
              <div className="timer__time">{time}</div>
              <progress className="timer__bar" value={time} max={word.length} />
            </div>
          ) : (
            <div className="game__score">
              <span>Game Over</span>
              {"Score: " + score.time + "s "}
              {"Words: " + score.wordCount}
            </div>
          )}

          <div className="game__word">
            {word.split("").map((letter, index) => {
              const letterClass = getLetterClass(letter, index, userInput);
              return (
                <h1 key={index} className={`word__letter${letterClass}`}>
                  {letter}
                </h1>
              );
            })}
          </div>
          <input
            className="game__input"
            type="text"
            value={userInput}
            disabled={!isGameActive}
            onChange={(e) => setUserInput(e.target.value)}
            autoFocus
          />
          <button
            className="game__button"
            disabled={isGameActive}
            onClick={gameRestart}
          >
            Play Again
          </button>
          <button
            className="game__button"
            onClick={() => {
              setgameDetails({ name: "", difficulty: "" });
            }}
          >
            Quit Game
          </button>
        </div>
        <Scoreboard gameScoreArr={gameScoreArr} />
      </div>
    </>
  );
};

export default Game;
