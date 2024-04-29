import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const App = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isExploding, setIsExploding] = useState(false);

  function handleCellClick(index) {
    if (board[index] !== null) return;
    const boardCopy = [...board];
    boardCopy[index] = isXTurn ? "X" : "O";
    setBoard(boardCopy);
    setIsXTurn(!isXTurn);
    const checkIsWinner = checkWinner(boardCopy);
    if (checkIsWinner) {
      setWinner(isXTurn ? "X" : "O");
      setIsExploding(true);
    } else if (boardCopy.every((cell) => cell !== null)) {
      setWinner("Draw");
    }
  }

  function checkWinner(board) {
    const WINNER_PATTERNS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of WINNER_PATTERNS) {
      const [a, b, c] = pattern;

      if (
        board[a] !== null &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    setBoard(initialBoard);
    setIsXTurn(true);
  }

  function playAgain() {
    setWinner(null);
    resetGame();
  }

  return (
    <div className="main">
      <div className="confetti">
        {winner && <ConfettiExplosion />}
      </div>
      <div className="board-header">
        <h3 className="board-heading">
          {!winner
            ? `Player ${isXTurn ? "X" : "O"}'s turn`
            : winner === "Draw"
            ? "It's a draw 😑"
            : `Player ${winner} wins 🎉`}
        </h3>
        <button onClick={!winner ? resetGame : playAgain}>
          {winner ? "Play Again" : "Reset game"}
        </button>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() =>
              !winner && handleCellClick(index)
            }
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
