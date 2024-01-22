import dictWords from "../assets/dictionary.json";

export default function selectWord(diffFactor: number) {
  function random(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1));
  }

  const dictonary = dictWords.filter((word) => {
    if (diffFactor >= 1 && diffFactor < 1.5) {
      return word.length <= 4;
    } else if (diffFactor >= 1.5 && diffFactor < 2) {
      return word.length > 4 && word.length <= 8;
    } else {
      return word.length > 8;
    }
  });
  const selectedWord = dictonary[random(0, dictonary.length - 1)];

  const selectedTime =
    diffFactor >= 1 && diffFactor < 1.5
      ? selectedWord.length
      : diffFactor >= 1.5 && diffFactor < 2
      ? Math.floor(selectedWord.length / 1.5)
      : Math.floor(selectedWord.length / 2);
  return { selectedWord, selectedTime };
}
