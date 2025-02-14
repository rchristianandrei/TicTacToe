import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register(){

    const navigate = useNavigate()

    const username = useRef<HTMLInputElement>(null)
    const displayName = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const confirmPassword = useRef<HTMLInputElement>(null)

    const [errorMessage, setErrorMessage] = useState("")
    const [processing, setProcessing] = useState(false)

    return(
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl">Register</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    
                    if(!username.current?.value){
                        setErrorMessage("Username can't be blank")
                        return
                    }

                    if(!displayName.current?.value){
                        setErrorMessage("Display Name can't be blank")
                        return
                    }

                    if(!password.current?.value){
                        setErrorMessage("Password can't be blank")
                        return
                    }

                    if(password.current?.value !== confirmPassword.current?.value){
                        setErrorMessage("Passwords do not match")
                        return
                    }
                    
                    setErrorMessage("")
                    setProcessing(true)
                    console.log("register")
                }}>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="username">Username</label>
                        <input ref={username} className="border p-2 rounded-lg" type="text" id="username" name="username"/>
                    </div>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="displayName">Display Name</label>
                        <input ref={displayName} className="border p-2 rounded-lg" type="text" id="displayName" name="displayName"/>
                    </div>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="password">Password</label>
                        <input ref={password} className="border p-2 rounded-lg" type="password" id="password" name="password"/>
                    </div>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="confirmPassword">Confirm Password</label>
                        <input ref={confirmPassword} className="border p-2 rounded-lg" type="password" id="confirmPassword" name="confirmPassword"/>
                    </div>
                    {errorMessage && <div className="text-red-700">{errorMessage}</div>}
                    <button className="bg-blue-600 hover:bg-blue-300 border cursor-pointer p-5 mt-5 rounded-lg text-[whitesmoke] hover:text-[black] text-lg w-100">
                        Sign up?
                    </button>
                </form>
                <button onClick={() => {
                    console.log("go to login")
                    navigate("/login")
                }} className="bg-[#FFF] hover:bg-[#BBB] border border-[#FFF] hover:border-[#000] cursor-pointer mt-5 p-5 rounded-lg">
                    Login
                </button>
            </div>
        </main>
    )
}