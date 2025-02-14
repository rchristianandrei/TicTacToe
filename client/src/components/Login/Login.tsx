import { useNavigate } from "react-router-dom"

export default function Login(){

    const navigate = useNavigate()

    return(
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl">Login</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    console.log("Login")
                    navigate("/")
                }}>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="username">Username</label>
                        <input className="border p-2 rounded-lg" type="text" id="username" name="username"/>
                    </div>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="password">Password</label>
                        <input className="border p-2 rounded-lg" type="password" id="password" name="password"/>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-300 border cursor-pointer p-5 mt-5 rounded-lg text-[whitesmoke] hover:text-[black] text-lg w-100">
                        Jump in!
                    </button>
                </form>
                <button onClick={() => {
                    console.log("Register")
                    navigate("/register")
                }} className="bg-[#FFF] hover:bg-[#BBB] border border-[#FFF] hover:border-[#000] cursor-pointer mt-5 p-5 rounded-lg">
                    Register
                </button>
            </div>
        </main>
    )
}