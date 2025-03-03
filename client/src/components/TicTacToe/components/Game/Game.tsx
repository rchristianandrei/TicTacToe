import { useEffect, useRef, useState } from "react"
import GridPlate from "./GridPlate"
import gameServices from "../../../../services/gameServices";
import { subscribeToMessages, unsubscribeToMessages } from "../../../../services/wsServices";

export default function CreateLobby(){

    const abortCtrl = useRef<AbortController | null>(null)

    const [enemyName, setEnemyName] = useState("[Challenger]")
    const [yourTurn, setYourTurn] = useState(true)
    const [matrix, setMatrix] = useState<string[]>([])

    function getData(){
        abortCtrl.current = new AbortController();
        gameServices.getData(abortCtrl.current.signal)
        .then(data => {
            setEnemyName(data.enemyName)
            setYourTurn(data.yourTurn)
            setMatrix(data.data)
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

        <main className={`${yourTurn && "bg-green-500"} h-[100vh] flex justify-center items-center`} >
            <div className="grid grid-cols-3 grid-rows-3 gap-5 w-[500px] h-[500px] max-w-[500px] max-h-[500px]">
                {matrix.map((v, i) => {
                        return <GridPlate key={i} yourTurn={yourTurn} value={v} onClick={() => {
                            gameServices.updateGame(i)
                            .catch(reason => console.error(reason))
                        }}></GridPlate>
                })}
            </div>
        </main>
        </>
    )
}