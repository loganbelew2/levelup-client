import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEvents, updateEvent } from "../../managers/EventManager"

export const UpdateEvent = () => {
    const { eventId } = useParams()
    const [event, setEvent] = useState({
        title: "",
        organizer: 0,
        date: "",
        location: "",
        game: 0
    })
    const [events, setEvents] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getEvents(`/${eventId}`).then(data => {
            const updatedEvent = {
                ...data,
                game: data.game.id,
                organizer: data.organizer.id
            };
            setEvent(updatedEvent);
        });

        getEvents().then(data => setEvents(data));
    }, [eventId]);


    const changeEventState = (domEvent) => {
        const { name, value } = domEvent.target;

        setEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Change Event </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Event: </label>
                    <input type="text" name="title"
                        value={event.title} onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location"> Where: </label>
                    <input type="text" name="location"
                        value={event.location} onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date"> When: </label>
                    <input type="text" name="date"
                        value={event.date} placeholder="yyyy-mm-dd" pattern="\d{2}/\d{2}/\d{4}" required
                        onChange={changeEventState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="game" onChange={changeEventState}>
                        <option key={0} value={0}> Select the game</option>
                        {events.map(evt => <option key={`event--${evt.id}`} value={evt.game.id}>{evt.game.title}</option>)}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()



                    const newEvent = {
                        title: event.title,
                        organizer: event.organizer,
                        date: event.date,
                        location: event.location,
                        game: parseInt(event.game)
                    }
                    // Send POST request to your API    
                    updateEvent(newEvent, eventId)
                        .then(() => navigate(`/event/${eventId}`))
                }}
                className="btn btn-primary">Submit</button>

        </form>
    )
}