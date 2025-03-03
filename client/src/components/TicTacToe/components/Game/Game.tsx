import { useState } from "react"
import GridPlate from "./GridPlate"

export default function CreateLobby(){

    const [yourTurn, setYourTurn] = useState(true)

    return(
        <>
        <header className="fixed top-0 left-0 right-0 border-s border-b border-e rounded-b-lg max-w-[500px] h-[75px] m-auto flex flex-col justify-center items-center bg-[whitesmoke]">
            <h1 className="text-xl">You vs [Challenger]</h1>
            <h2 className={`text-3xl ${yourTurn && "text-green-500"} hover:text-green-500`}>
                {yourTurn ? "Your Turn" : "Please wait"}
            </h2>
        </header>

        <main className={`${yourTurn && "bg-green-500"} h-[100vh] flex justify-center items-center`} >
            <div className="grid grid-cols-3 grid-rows-3 gap-5 w-[500px] h-[500px] max-w-[500px] max-h-[500px]">
                <GridPlate yourTurn={yourTurn} value="1"></GridPlate>
                <GridPlate yourTurn={yourTurn} value="2"></GridPlate>
                <GridPlate yourTurn={yourTurn} value="3"></GridPlate>
                <GridPlate yourTurn={yourTurn} value="4"></GridPlate>
                <GridPlate yourTurn={yourTurn} value="5"></GridPlate>
                <GridPlate yourTurn={yourTurn} value="6"></GridPlate>
                <GridPlate yourTurn={yourTurn} value="7"></GridPlate>
                <GridPlate yourTurn={yourTurn} value="8"></GridPlate>
                <GridPlate yourTurn={yourTurn} value="9"></GridPlate>
            </div>
        </main>
        </>
    )
}