import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
       getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        const { name, value } = domEvent.target;

        setCurrentGame(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    Skill Level
                    <select  name="skillLevel" value={currentGame.skillLevel} className="skillSelect" onChange={changeGameState}>
                        <option value={1} className="skillOption">1</option>
                        <option value={2} className="skillOption">2</option>
                        <option value={3} className="skillOption">3</option>
                        <option value={4} className="skillOption">4</option>
                        <option value={5} className="skillOption">5</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                
                <select name="gameTypeId" value={currentGame.gameTypeId} onChange={changeGameState}>
                    {
                        gameTypes.map(type => <option value={type.id} key= {`gameType--${type.id}`}>
                            {type.name}
                        </option>)
                    }
                </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }
                    console.log(game.game_type)
                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}