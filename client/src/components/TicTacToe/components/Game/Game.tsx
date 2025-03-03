import { useEffect, useState } from "react"
import GridPlate from "./GridPlate"
import gameServices from "../../../../services/gameServices";

export default function CreateLobby(){

    const [enemyName, setEnemyName] = useState("[Challenger]")
    const [yourTurn, setYourTurn] = useState(true)
    const [matrix, setMatrix] = useState([["","",""], ["","",""], ["","",""]])

    useEffect(() => {
        let controller: AbortController | null = null;
        
        function getData(){
            controller = new AbortController();
            gameServices.getData(controller.signal)
            .then(data => {
                setEnemyName(data.enemyName)
                setYourTurn(data.yourTurn)
                setMatrix(data.data)
            })
            .catch(reason => console.error(reason))
        }

        getData();

        return () => {
            controller?.abort("");
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
                {matrix.map((v1, i1) => {
                    const basekey = 3 * i1
                    return v1.map((v2, i2) => {
                        return <GridPlate key={basekey + i2} yourTurn={yourTurn} value={v2} onClick={() => {
                            setMatrix(matrix.map((a1, b1) => b1 !== i1 ? a1 : a1.map((a2, b2) => b2 === i2 ? "x" : a2)))
                        }}></GridPlate>
                    })
                })}
            </div>
        </main>
        </>
    )
}