import { useState, useEffect } from "react";
import selectWord from "./selectWord.tsx";

function useGame(
  timerRef: React.RefObject<HTMLDivElement>,
  wordInputRef: React.RefObject<HTMLInputElement>,
  gameOverRef: React.RefObject<HTMLDivElement>,
  difficulty: number
) {
  const { selectedWord: initialWord, selectedTime: initialTime } =
    selectWord(difficulty);

  // State variables
  const [scoreWordCount, setScoreWordCount] = useState<number>(0);
  const [scoreTime, setScoreTime] = useState<number>(0);
  const [gameNum, setGameNum] = useState<number>(1);
  const [time, setTime] = useState<number>(initialTime);
  const [word, setWord] = useState<string>(initialWord);
  const [diffFactor, setDiffFactor] = useState<number>(difficulty);
  const [gameScoreArr, setGameScoreArr] = useState<
    Array<{
      score: number;
      wordCount: number;
    }>
  >([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

  // ---Score Board---

  //Rendering the list of scores
  const listItems = gameScoreArr.map((gameScoreArr, index) => (
    <li className="game__screen__right__scoreboardlist" key={index}>
      <h5>Game {index + 1}</h5>
      Score: {gameScoreArr.score} | Words: {gameScoreArr.wordCount}
    </li>
  ));

  // function to get a new word based on difficulty
  function newWord() {
    setUserInput("");
    const { selectedWord, selectedTime } = selectWord(diffFactor);
    setWord(selectedWord);
    setTime(selectedTime);
  }

  // function to handle play again
  function handlePlayAgain() {
    setGameNum(gameNum + 1);
    timerRef.current!.style.display = "flex";
    gameOverRef.current!.style.display = "none";
    newWord();
    setScoreWordCount(0);
    setScoreTime(0);
    wordInputRef.current!.disabled = false;
    wordInputRef.current?.focus();
    wordInputRef.current!.value = "";
    setButtonDisabled(true);
  }
  //function to handle Gme Over
  const handleGameOver = () => {
    setGameScoreArr((prevGameScoreArr) => [
      ...prevGameScoreArr,
      { score: scoreTime, wordCount: scoreWordCount },
    ]);
    console.log(gameScoreArr);

    gameOverRef.current!.style.display = "flex";
    timerRef.current!.style.display = "none";
    wordInputRef.current!.disabled = true;
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
        setScoreTime(scoreTime + 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]); // Include time as a dependency

  //function for handling user input
  function handleInput(input: string) {
    setUserInput(input);
    if (input === word) {
      newWord();
      setDiffFactor(diffFactor + 0.01);
      setScoreWordCount(scoreWordCount + 1);
      wordInputRef.current!.value = "";
    }
  }

  //function to change the word color and compare with user input

  return {
    time,
    word,
    gameNum,
    listItems,
    isButtonDisabled,
    scoreTime,
    userInput,
    scoreWordCount,
    diffFactor,
    handlePlayAgain,
    handleInput,
  };
}
export default useGame;
