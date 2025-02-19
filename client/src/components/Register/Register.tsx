import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../../services/userServices"

export default function Register(){

    const navigate = useNavigate()

    const usernameField = useRef<HTMLInputElement>(null)
    const displayNameField = useRef<HTMLInputElement>(null)
    const passwordField = useRef<HTMLInputElement>(null)
    const confirmPasswordField = useRef<HTMLInputElement>(null)

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    return(
        <main className="flex h-screen justify-center items-center">
            <div className="border-solid border-black border p-10 text-center rounded-lg">
                <h1 className="text-6xl">Register</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setShowSuccessMessage(false)

                    const username =usernameField.current?.value
                    const displayName = displayNameField.current?.value
                    const password = passwordField.current?.value
                    
                    if(!username){
                        setErrorMessage("Username can't be blank")
                        return
                    }

                    if(!displayName){
                        setErrorMessage("Display Name can't be blank")
                        return
                    }

                    if(!password){
                        setErrorMessage("Password can't be blank")
                        return
                    }

                    if(passwordField.current?.value !== confirmPasswordField.current?.value){
                        setErrorMessage("Passwords do not match")
                        return
                    }
                    
                    register(username, displayName, password)
                    .then(() =>{
                        setErrorMessage("")
                        setShowSuccessMessage(true)
                    })
                    .catch(reason => {
                        setErrorMessage(reason.message)
                    })
                }}>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="username">Username</label>
                        <input ref={usernameField} className="border p-2 rounded-lg" type="text" id="username" name="username"/>
                    </div>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="displayName">Display Name</label>
                        <input ref={displayNameField} className="border p-2 rounded-lg" type="text" id="displayName" name="displayName"/>
                    </div>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="password">Password</label>
                        <input ref={passwordField} className="border p-2 rounded-lg" type="password" id="password" name="password"/>
                    </div>
                    <div className="flex flex-col my-5">
                        <label className="text-left text-xl" htmlFor="confirmPassword">Confirm Password</label>
                        <input ref={confirmPasswordField} className="border p-2 rounded-lg" type="password" id="confirmPassword" name="confirmPassword"/>
                    </div>
                    {errorMessage && <div className="text-red-700">{errorMessage}</div>}
                    {showSuccessMessage && <div className="text-green-700">Successfully registered the user</div>}
                    <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] border cursor-pointer p-5 mt-5 rounded-lg text-[whitesmoke] hover:text-[black] text-lg w-100">
                        Sign up?
                    </button>
                </form>
                <button onClick={() => {
                    navigate("/login")
                }} className="bg-[#FFF] hover:bg-[#BBB] border border-[#FFF] hover:border-[#000] cursor-pointer mt-5 p-5 rounded-lg">
                    Login
                </button>
            </div>
        </main>
    )
}