import { useEffect, useRef, useState } from "react"
import GridPlate from "./GridPlate"
import gameServices from "../../../../services/gameServices";
import { subscribeToMessages, unsubscribeToMessages } from "../../../../services/wsServices";
import { useNavigate } from "react-router-dom";
import { deleteLobby } from "../../../../services/lobbyServices";

export default function CreateLobby(){

    const navigate = useNavigate();
    const abortCtrl = useRef<AbortController | null>(null)
    
    const [roomNumber, setRoomNumber] = useState("")
    const [enemyName, setEnemyName] = useState("[Challenger]")
    const [yourTurn, setYourTurn] = useState(true)
    const [matrix, setMatrix] = useState<string[]>([])

    const [gameOver, setGameOver] = useState(false)
    const [youWin, setYouWin] = useState(false)

    function getData(){
        abortCtrl.current = new AbortController();
        gameServices.getData(abortCtrl.current.signal)
        .then(data => {
            console.log(data)
            setRoomNumber(data.roomNumber)
            setEnemyName(data.enemyName)
            setYourTurn(data.yourTurn)
            setMatrix(data.data)
            setGameOver(data.gameOver)
            setYouWin(data.youWin)
        })
        .catch(reason => console.error(reason))
    }

    useEffect(() => {
        function subtoMessage(data: any){
            if(data.type === "game updated"){
                getData()
            }
        }
        
        getData();
        subscribeToMessages(subtoMessage)

        return () => {
            abortCtrl.current?.abort();
            unsubscribeToMessages(subtoMessage)
        }
    }, [])

    return(
        <>
        <header className="fixed top-0 left-0 right-0 border-s border-b border-e rounded-b-lg max-w-[500px] h-[75px] m-auto flex flex-col justify-center items-center bg-[whitesmoke]">
            <h1 className="text-xl">You vs {enemyName}</h1>
            <h2 className={`text-3xl ${yourTurn && "text-green-500"} hover:text-green-500`}>
                {yourTurn ? "Your Turn" : "Please wait"}
            </h2>
        </header>

        <main className={`${yourTurn && !gameOver && "bg-green-500"} h-[100vh] flex justify-center items-center`} >
            <div className="grid grid-cols-3 grid-rows-3 gap-5 w-[500px] h-[500px] max-w-[500px] max-h-[500px]">
                {matrix.map((v, i) => {
                        return <GridPlate key={i} yourTurn={yourTurn} value={v} onClick={() => {
                            gameServices.updateGame(i)
                            .catch(reason => console.error(reason))
                        }}></GridPlate>
                })}
            </div>

            {gameOver && 
            <>
                <div className="fixed inset-0 bg-black opacity-[0.5]"></div>
                <div className={`fixed inset ${youWin ? "bg-green-200" : "bg-red-200"} border rounded w-[300px] py-10 px-15`}>
                    <h1 className="text-3xl font-bold py-8 text-center">{youWin ? "You Win!" : "You Lose..."}</h1>
                    <div className="flex flex-col">
                        {/* <button className="border rounded bg-white p-5 my-2 cursor-pointer hover:opacity-[0.75]">Play Again?</button> */}
                        <button type="button" onClick={() => {
                            deleteLobby(roomNumber).then(() => navigate("/lobby"))
                        }} className="border rounded bg-white p-5 my-2 cursor-pointer hover:opacity-[0.75]">Exit</button>
                    </div>
                </div>
            </>
            }
        </main>
        </>
    )
}