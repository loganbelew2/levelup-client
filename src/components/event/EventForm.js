import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from "../../managers/EventManager"
export const EventForm = () => {
    const navigate = useNavigate()
    const [currentEvent, setCurrentEvent] = useState({
        title: "",
        organizer: 0,
        date: "",
        location: "",
        attendees: [],
        game: 0
    })
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    },[])
    const changeEventState = (domEvent) => {
        const { name, value } = domEvent.target;

        setCurrentEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title"
                        value={currentEvent.title} onChange={changeEventState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Where: </label>
                    <input type="text" name="location"
                        value={currentEvent.location} onChange={changeEventState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">When: </label>
                    <input type="text" name="date"
                        value={currentEvent.date} onChange={changeEventState} placeholder="01/01/2023"  pattern="\d{2}/\d{2}/\d{4}" required/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="game" value={currentEvent.game} onChange={changeEventState}>
                        {games.map( (game) =>
                         <option value={game.id} key={`game--${game.id}`}>
                                {game.title}
                        </option>)
                        }
                    </select>
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    
                    const inputDate = currentEvent.date;
                    const [mm, dd, yyyy] = inputDate.split("/");
                    const formattedDate = `${yyyy}-${mm}-${dd}`;

                    const event = {
                        title: currentEvent.title,
                        organizer: currentEvent.organizer,
                        date: formattedDate,
                        location: currentEvent.location,
                        attendees: currentEvent.attendees,
                        game: parseInt(currentEvent.game)
                    }
                    // Send POST request to your API    
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>

        </form>
    )
}