import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendMessage, subscribeToMessages, unsubscribeToMessages } from "../../../../services/wsServices"
import lobbyServices from "../../../../services/lobbyServices"

export default function CreateLobby(){

    const navigate = useNavigate()

    const [roomNumber, setRoomNumber] = useState("●●●●●●")

    useEffect(() => {
        function joinedLobby(data : any){
            // if(data.type !== "createdLobby") return;

            // setRoomNumber(data.roomNumber)
        }

        lobbyServices.createLobby().then(res => {
            if(!res) return
            setRoomNumber(res.roomNumber)
        })
        .catch(reason => console.log(reason))
        subscribeToMessages(joinedLobby)

        return () => {
            unsubscribeToMessages(joinedLobby)
        }
    }, [])

    return(
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl">Lobby #</h1>
                <h2 className="text-4xl">{roomNumber}</h2>
                <hr className="my-3" />
                <h3 className="text-2xl">Opponent</h3>
                <h4 className="text-xl">None</h4>
                <nav className="mt-5">
                    <ul className="flex flex-col ">
                        <li className="list-none my-2">
                            <button onClick={() => {
                            }} className="bg-blue-600 hover:bg-blue-300 border cursor-pointer p-5 rounded-lg w-50 text-[whitesmoke] hover:text-[black] text-lg">
                                Start
                            </button>
                        </li>     
                        <li className="list-none my-2">
                            <button onClick={() => {
                                navigate("/lobby")
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