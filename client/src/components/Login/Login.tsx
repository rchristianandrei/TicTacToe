import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../services/authServices"

export default function Login(){

    const navigate = useNavigate()

    const usernameField = useRef<HTMLInputElement>(null)
    const passwordField = useRef<HTMLInputElement>(null)

    const [errorMessage, setErrorMessage] = useState<string>("")

    return(
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl">Login</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    const username = usernameField.current?.value
                    const password = passwordField.current?.value
                    
                    if(!username){
                        setErrorMessage("Username can't be blank")
                        return
                    }

                    if(!password){
                        setErrorMessage("Password can't be blank")
                        return
                    }

                    login(username, password)
                    .then(() => {
                        setErrorMessage("")
                        navigate("/")
                    })
                    .catch((reason)=> {
                        setErrorMessage(reason.message)
                    })
                }}>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="username">Username</label>
                        <input ref={usernameField} className="border p-2 rounded-lg" type="text" id="username" name="username"/>
                    </div>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="password">Password</label>
                        <input ref={passwordField} className="border p-2 rounded-lg" type="password" id="password" name="password"/>
                    </div>
                    {errorMessage && <div className="text-red-700">{errorMessage}</div>}
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