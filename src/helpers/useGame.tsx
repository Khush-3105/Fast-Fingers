import { useState, useEffect, SetStateAction, Dispatch } from "react";
import selectWord from "./selectWord.tsx";

interface GameHookProps {
  difficulty: number;
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
}

function useGame({ difficulty, userInput, setUserInput }: GameHookProps) {
  const { selectedWord: initialWord, selectedTime: initialTime } =
    selectWord(difficulty);
  const [time, setTime] = useState<number>(initialTime);
  const [word, setWord] = useState<string>(initialWord);
  const [diffFactor, setDiffFactor] = useState<number>(difficulty);
  const [gameNum, setGameNum] = useState<number>(1);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [score, setScore] = useState<{
    time: number;
    wordCount: number;
  }>({ time: 0, wordCount: 0 });
  const [gameScoreArr, setGameScoreArr] = useState<Array<typeof score>>([]);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (time === 0) {
        setDiffFactor(difficulty);
        setGameScoreArr((prevGameScoreArr) => [
          ...prevGameScoreArr,
          { time: score.time, wordCount: score.wordCount },
        ]);
        setIsGameActive(false);
        clearInterval(intervalId);
      } else {
        setTime((prevTime) => prevTime - 1);
        setScore((prevScore) => {
          return { time: prevScore.time + 1, wordCount: prevScore.wordCount };
        });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  useEffect(() => {
    if (userInput === word) {
      newWord();
    }
  }, [userInput]);

  function gameRestart() {
    setScore({ time: 0, wordCount: 0 });
    setGameNum(gameNum + 1);
    setIsGameActive(true);
    newWord();
  }

  function newWord() {
    const { selectedWord, selectedTime } = selectWord(diffFactor);
    setDiffFactor(diffFactor + 0.05);
    setUserInput("");
    setWord(selectedWord);
    setTime(selectedTime);
    setScore((prevScore) => {
      return { time: prevScore.time, wordCount: prevScore.wordCount + 1 };
    });
  }

  return {
    time,
    word,
    isGameActive,
    diffFactor,
    score,
    gameScoreArr,
    gameNum,
    gameRestart,
  };
}

export default useGame;
