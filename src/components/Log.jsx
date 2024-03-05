export default function Log({ turns, currentPlayerNow }) {
    // Assuming turns is an array
    let newTurns = [...turns]; // Copying the array
    newTurns.push({ activePlayer: currentPlayerNow });

    return (
        <ol id="log">
            {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>{turn.square.row}, {turn.square.col} was selected by {currentPlayerNow[turn.player]}</li>)}
        </ol>
    );
}



//{turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>{turn.square.row}, {turn.square.col} was selected by</li>)}currentPlayerNow