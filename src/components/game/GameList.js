import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager"
import "./games.css"
import { useNavigate } from "react-router-dom"
export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker?.user?.first_name} {game.maker?.user?.last_name}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div className="game__update"> <button onClick={() => navigate({pathname: `/game/${game.id}/update`})}>Update Game?</button> </div>
                    </section>
                })
            }
        </article>
    )
}