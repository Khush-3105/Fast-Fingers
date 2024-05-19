import { FC } from "react";
import "./Scoreboard.css";

interface ScoreboardProps {
  gameScoreArr: { time: number; wordCount: number }[];
}

export const Scoreboard: FC<ScoreboardProps> = ({ gameScoreArr }) => {
  
  const listItems = gameScoreArr
    .map((gameScoreArr, index) => (
      <div className="list__item" key={index}>
        <h4>Round {index + 1}</h4>
        {"Score: " + gameScoreArr.time + "s | Words: " + gameScoreArr.wordCount}
      </div>
    ))
    .reverse();

  return (
    <>
      <div className="scoreboard">
        <h2>Score Board</h2>
        <div className="scoreboard__list">{listItems}</div>
      </div>
    </>
  );
};
