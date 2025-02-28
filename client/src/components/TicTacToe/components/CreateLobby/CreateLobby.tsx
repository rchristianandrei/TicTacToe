import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { subscribeToMessages, unsubscribeToMessages } from "../../../../services/wsServices"
import lobbyServices from "../../../../services/lobbyServices"

export default function CreateLobby(){

    const navigate = useNavigate()

    const [roomNumber, setRoomNumber] = useState("●●●●●●")
    const [opponent, setOpponent] = useState("None")

    useEffect(() => {
        let controller: AbortController | null = null;

        function loadCreateLobby (){
            controller = new AbortController();
            
            lobbyServices.createLobby(controller.signal)
            .then(res => {
                if(!res) return
                setRoomNumber(res.roomNumber)
                setOpponent(res.opponentName ? res.opponentName: "None")
            })
            .catch(reason => console.log(reason))
            .finally(() => controller = null)
        }

        function wsMessages(data : any){
            const types = ["joinLobby", "opponent left"]
            if(!types.includes(data.type)) return
            loadCreateLobby()
        }

        loadCreateLobby()
        subscribeToMessages(wsMessages)

        return () => {
            controller?.abort()
            unsubscribeToMessages(wsMessages)
        }
    }, [])

    return(
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl">Lobby #</h1>
                <h2 className="text-4xl">{roomNumber}</h2>
                <hr className="my-3" />
                <h3 className="text-2xl">Opponent</h3>
                <h4 className="text-xl">{opponent}</h4>
                <nav className="mt-5">
                    <ul className="flex flex-col ">
                        <li className="list-none my-2">
                            <button onClick={() => {
                            }} className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] border cursor-pointer p-5 rounded-lg w-50 text-[whitesmoke] hover:text-[black] text-lg">
                                Start
                            </button>
                        </li>     
                        <li className="list-none my-2">
                            <button onClick={() => {
                                lobbyServices.deleteLobby(roomNumber)
                                .then(result => {
                                    if(!result) return
                                    navigate("/lobby")
                                }).catch((reason) => {
                                    console.log(reason)
                                    return})
                            }} className="bg-[#FFF] hover:bg-[#BBB] border border-[#FFF] hover:border-[#000] cursor-pointer p-5 rounded-lg">
                                Exit
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    )
}