export default function getLetterClass(
  letter: string,
  index: number,
  userInput: string
) {
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
}
