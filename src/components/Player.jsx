import { useState } from "react"

export default function Player({ name, symbol, isActive, onChangeName, winsCounter }) {
    const [changedPlayerName, setchangedPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    function nameEditing() {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onChangeName(symbol, changedPlayerName);
        }
    }

    function changedName(event) {
        setchangedPlayerName(event.target.value)
    }

    let playerName = <span className="player-name">{changedPlayerName}</span>;
    let winnerCounter = <span className="player-name">{changedPlayerName}</span>;

    if (isEditing) {
        playerName = <input type="text" required value={changedPlayerName} onChange={changedName}></input>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}<button onClick={nameEditing}>{isEditing ? 'Save' : 'Edit'}</button>
                <br />
                <span className="player-name">[ {symbol} ] WINS : {winsCounter}</span>
            </span>

        </li>
    )
}