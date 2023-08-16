import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"
import "./events.css"
import { useNavigate } from "react-router-dom"
export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
        <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event" >
                        <div className="event__title">{event.title} by {event?.organizer?.user?.first_name} {event?.organizer?.user?.last_name}</div>
                        <div className="event__date"><b><em>When? </em></b> {event.date}</div>
                        <div className="event__location">go to {event.location}</div>
                        <div className="event__game"> Game Played : {event?.game?.title}</div>
                    </section>
                })
            }
        </article>
    )
}