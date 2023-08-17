import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameTypes, getGames, updateGame } from "../../managers/GameManager"

export const UpdateGame = () => {
    const { gameId } = useParams()
    const [game, setGame] = useState({
        title: "",
        numberOfPlayers: 0,
        skillLevel: "",
        gameType: 0
    })
    const [games, setGames] = useState([])
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    useEffect(() => {
        getGames(`/${gameId}`).then(data => {
            const updatedGame = {
                ...data,
                gameType: data.game_type.id,
                numberOfPlayers: data.number_of_players,
                maker: data.maker.id,
                skillLevel: data.skill_level,
            };
            setGame(updatedGame);
        });


        getGames().then(data => setGames(data));
    }, [gameId]);

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    },[])

    const changeGameState = (domEvent) => {
        const { name, value } = domEvent.target;

        setGame(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Change game </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">game: </label>
                    <input type="text" name="title"
                        value={game.title} onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    Number Of Players:
                    <select name="numberOfPlayers" onChange={changeGameState}>
                        {Array.from({ length: 10 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1} players
                            </option>))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    Skill Level
                    <select name="skillLevel" onChange={changeGameState}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                               skill {index + 1}
                            </option>))}
                    </select>
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <select name="gameType" onChange={changeGameState}>
                        <option key={0} value={0}> Select the gameType</option>
                        {gameTypes.map(type => <option key={`gameType--${type.id}`} value={type.id}>{type.name}</option>)}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prgame form from being submitted
                    evt.preventDefault()



                    const newGame = {
                        title: game.title,
                        number_of_players: parseInt(game.numberOfPlayers),
                        skill_level: parseInt(game.skillLevel),
                        game_type: parseInt(game.gameType)
                    }
                    // Send POST request to your API    
                    updateGame(newGame, gameId)
                        .then(() => navigate(`/game/${gameId}`))
                }}
                className="btn btn-primary">Submit</button>

        </form>
    )
}