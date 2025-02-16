import { useNavigate } from "react-router-dom"

export default function Lobby(){

    const navigate = useNavigate()

    return(
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl">Lobby</h1>
                <nav className="mt-5">
                    <ul className="flex flex-col ">
                        <li className="list-none my-2">
                            <button onClick={() => {
                                navigate("/createlobby")
                            }} className="bg-blue-600 hover:bg-blue-300 border cursor-pointer p-5 rounded-lg w-50 text-[whitesmoke] hover:text-[black] text-lg">
                                Create Lobby
                            </button>
                        </li>   
                        <li className="list-none my-2">
                            <button onClick={() => {
                                navigate("/joinlobby")
                            }} className="bg-blue-600 hover:bg-blue-300 border cursor-pointer p-5 rounded-lg w-50 text-[whitesmoke] hover:text-[black] text-lg">
                                Join Lobby
                            </button>
                        </li>   
                        <li className="list-none my-2">
                            <button onClick={() => {
                                navigate("/")
                            }} className="bg-[#FFF] hover:bg-[#BBB] border border-[#FFF] hover:border-[#000] cursor-pointer p-5 rounded-lg">
                                Back
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>)
}