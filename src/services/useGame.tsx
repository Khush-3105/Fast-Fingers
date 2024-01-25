import { useState, useEffect } from "react";
import selectWord from "./selectWord.tsx";

interface GameHookProps {
  difficulty: number;
}

function useGame({ difficulty }: GameHookProps) {
  const { selectedWord: initialWord, selectedTime: initialTime } =
    selectWord(difficulty);

  const [time, setTime] = useState<number>(initialTime);
  const [word, setWord] = useState<string>(initialWord);
  const [diffFactor, setDiffFactor] = useState<number>(difficulty);
  const [scoreTime, setScoreTime] = useState<number>(0);
  const [scoreWordCount, setScoreWordCount] = useState<number>(0);
  const [gameOver, setGameOver]=useState<boolean>(false);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (time === 0) {
        setDiffFactor(difficulty);
        setGameOver(true);
        clearInterval(intervalId);
      } else {
        setTime((prevTime) => prevTime - 1);
        setScoreTime(scoreTime + 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  function newWord() {
    const { selectedWord, selectedTime } = selectWord(diffFactor);
    setDiffFactor(diffFactor + 0.05);
    setWord(selectedWord);
    setTime(selectedTime);
    setScoreWordCount(scoreWordCount + 1);
  }

  function gameRestart() {
    setScoreWordCount(0);
    setScoreTime(0);
    setGameOver(false);
  }

  return {
    time,
    word,
    diffFactor,
    scoreTime,
    scoreWordCount,
    gameOver,
    newWord,
    gameRestart,
  };
}

export default useGame;
