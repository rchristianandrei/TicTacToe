import { Routes, Route, useNavigate} from "react-router-dom"
import { useEffect } from "react"

import ws from "../../services/wsServices"

import MainMenu from "./components/MainMenu/MainMenu"
import Lobby from "./components/Lobby/Lobby"
import CreateLobby from "./components/CreateLobby/CreateLobby"
import JoinLobby from "./components/JoinLobby/JoinLobby"
import { getUser } from "../../services/sessionStorageServices"
import Game from "./components/Game/Game"

export default function TicTacToe(){

    const navigate = useNavigate()

    useEffect(() => {

        const user = getUser()

        if(!user){
            navigate("/login")
            return
        }

        ws.connectToWSS(user.token)

        return () => {
            ws.closeWS()
        }
    }, [])
    
    return (
        <Routes>
            <Route path="/" element={<MainMenu></MainMenu>}></Route>
            <Route path="/lobby" element={<Lobby></Lobby>}></Route>
            <Route path="/createlobby" element={<CreateLobby></CreateLobby>}></Route>
            <Route path="/joinlobby" element={<JoinLobby></JoinLobby>}></Route>
            <Route path="/game" element={<Game></Game>}></Route>
        </Routes>
    )
}