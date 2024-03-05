import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { useState } from 'react';
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

let playerOneWins = 0, playerTwoWins = 0;

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS = {
  O: 'Player 2',
  X: 'Player 1'
}

function counter(winnerSymbol) {
  if (winnerSymbol === 'X') {
    playerOneWins += 1;
  }
  else if (winnerSymbol === 'O') {
    playerTwoWins += 1;
  }
  return [playerOneWins, playerTwoWins];
}


function derivedActivePlayer(gameTurns) {

  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

let deriveWinner = function (gameBoard, players) {

  let winner;
  let winnerSymbol;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
      winnerSymbol = firstSquareSymbol;
    }
  }
  return [winner, winnerSymbol];
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const [winner, winnerSymbol] = deriveWinner(gameBoard, players);

  let wins = counter(winnerSymbol);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns(prevTurns => {

      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: columnIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (<main><div id="game-container">
    <ol id="players" className="highlight-player">
      <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} winsCounter={wins[0]} />
      <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} winsCounter={wins[1]} />
    </ol>
    {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
    <GameBoard onSelectSquare={handleSelectSquare}
      board={gameBoard}
    />
  </div>
    <Log turns={gameTurns} currentPlayerNow={players} />
  </main>)
}


