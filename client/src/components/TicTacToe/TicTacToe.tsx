import { useNavigate } from "react-router-dom"
import { removeUser } from "../../services/sessionStorageServices"

export default function TicTacToe(){

    const navigate = useNavigate()

    return (
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl">Tic Tac Toe</h1>
                <nav className="mt-5">
                    <ul className="flex flex-col ">
                        <li className="list-none my-2">
                            <button onClick={() => {
                                console.log("Redirect to create or join lobby ui")
                            }} className="bg-blue-600 hover:bg-blue-300 border cursor-pointer p-5 rounded-lg w-50 text-[whitesmoke] hover:text-[black] text-lg">
                                Play
                            </button>
                        </li>   
                        <li className="list-none my-2">
                            <button onClick={() => {
                                removeUser()
                                navigate("/login")
                            }} className="bg-[#FFF] hover:bg-[#BBB] border border-[#FFF] hover:border-[#000] cursor-pointer p-5 rounded-lg">
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    )
}