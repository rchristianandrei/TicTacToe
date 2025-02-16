import { Routes, Route} from "react-router-dom"
import { useEffect } from "react"

import ws from "../../services/wsServices"

import MainMenu from "./components/MainMenu/MainMenu"
import Lobby from "./components/Lobby/Lobby"
import CreateLobby from "./components/CreateLobby/CreateLobby"
import JoinLobby from "./components/JoinLobby/JoinLobby"

export default function TicTacToe(){

    useEffect(() => {
        function subcribe(e: MessageEvent){
            const data = JSON.parse(e.data)
            console.log(data)
        }

        ws.connectToWSS()
        ws.subscribeToMessages(subcribe)

        return () => {
            ws.unsubscribeToMessages(subcribe)
            ws.closeWS()
        }
    }, [])
    
    return (
        <Routes>
            <Route path="/" element={<MainMenu></MainMenu>}></Route>
            <Route path="/lobby" element={<Lobby></Lobby>}></Route>
            <Route path="/createlobby" element={<CreateLobby></CreateLobby>}></Route>
            <Route path="/joinlobby" element={<JoinLobby></JoinLobby>}></Route>
        </Routes>
    )
}