function ScoreBoard(props: {
  gameScoreArr: { score: number; wordCount: number }[];
}) {
  const listItems = props.gameScoreArr.map((gameScoreArr, index) => (
    <li className="game__screen__right__scoreboardlist" key={index}>
      <h5>Game {index + 1}</h5>
      Score: {gameScoreArr.score} | Words: {gameScoreArr.wordCount}
    </li>
  ));

  return (
    <>
      <div id="game__screen__right__scoreboard">
        <h2>Score Board</h2>
        <hr />
        <br />
        <ul>{listItems}</ul>
      </div>
    </>
  );
}
export default ScoreBoard;
