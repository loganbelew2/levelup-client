import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { UpdateEvent } from "../components/event/UpdateEvent"
import { EventDetails } from "../components/event/EventDetails"
import { UpdateGame } from "../components/game/UpdateGame"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/games" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/event/:eventId/update" element={<UpdateEvent/>}/>
                <Route path="/game/:gameId/update" element={<UpdateGame/>}/>
                <Route path="/event/:eventId" element={<EventDetails/>}/>
            </Route>
        </Routes>
    </>
}