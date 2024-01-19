import easyWords from "../assets/easyWords.json";
import mediumWords from "../assets/mediumWords.json";
import hardWords from "../assets/hardWords.json";
export default function selectWord(diffFactor: number) {
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
