import { Routes, Route} from "react-router-dom"
import MainMenu from "./components/MainMenu/MainMenu"
import Lobby from "./components/Lobby/Lobby"
import CreateLobby from "./components/CreateLobby/CreateLobby"
import JoinLobby from "./components/JoinLobby/JoinLobby"

export default function TicTacToe(){

    return (
        <Routes>
            <Route path="/" element={<MainMenu></MainMenu>}></Route>
            <Route path="/lobby" element={<Lobby></Lobby>}></Route>
            <Route path="/createlobby" element={<CreateLobby></CreateLobby>}></Route>
            <Route path="/joinlobby" element={<JoinLobby></JoinLobby>}></Route>
        </Routes>
    )
}