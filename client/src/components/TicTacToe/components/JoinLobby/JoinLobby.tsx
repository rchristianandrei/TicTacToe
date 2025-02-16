import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function JoinLobby(){

    const navigate = useNavigate()

    const roomNumberField = useRef<HTMLInputElement>(null)

    const [errorMessage, setErrorMessage] = useState("")

    return(
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl my-3">Find Lobby</h1>
                <input ref={roomNumberField} type="text" maxLength={6} className="border p-2 rounded-lg text-4xl text-center"></input>
                {errorMessage && <div className="text-red-700">{errorMessage}</div>}
                <nav className="mt-5">
                    <ul className="flex flex-col ">
                        <li className="list-none my-2">
                            <button onClick={() => {
                                const roomNumber = roomNumberField.current?.value

                                if(!roomNumber){
                                    setErrorMessage("Unable to join")
                                    return
                                }

                                console.log("Join", roomNumber)

                            }} className="bg-blue-600 hover:bg-blue-300 border cursor-pointer p-5 rounded-lg w-50 text-[whitesmoke] hover:text-[black] text-lg">
                                Join
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