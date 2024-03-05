//import { useState } from 'react';


export default function GameBoard({ onSelectSquare, board }) {

    //, activePlayerSymbol }) {
    /* const [gameBoard, setGameBoard] = useState(initialGameBoard);
 
     function handleSelectSquare(rowIndex, columnIndex) {
         setGameBoard((prevGameBoard) => {
             const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
             updateBoard[rowIndex][columnIndex] = activePlayerSymbol;
             return updateBoard;
         });
         onSelectSquare();
     }
     */
    return (<ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, columnIndex) => <li key={columnIndex}><button onClick={() => onSelectSquare(rowIndex, columnIndex)} disabled={playerSymbol != null}>{playerSymbol}</button></li>)}
            </ol>
        </li>)}
    </ol>)
}