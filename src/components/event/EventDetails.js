import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEvents } from "../../managers/EventManager"

export const EventDetails = () => {
    const {eventId} = useParams()
    const [event, setEvent] = useState({})
    useEffect(() => {
        getEvents(`/${eventId}`).then(data => setEvent(data))
    },[])


    return <section key={`event--${event.id}`} className="event" >
        <div className="event__title">{event.title} by {event?.organizer?.user?.first_name} {event?.organizer?.user?.last_name}</div>
        <div className="event__date"><b><em>When? </em></b> {event.date}</div>
        <div className="event__location">go to {event.location}</div>
        <div className="event__game"> Game Played : {event?.game?.title}</div>
</section>
}