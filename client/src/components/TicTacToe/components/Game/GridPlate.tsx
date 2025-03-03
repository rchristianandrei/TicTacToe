export default function GridPlate(props: {yourTurn: boolean, value: string, onClick: () => void}){

    return (
        <div className={`bg-[whitesmoke] border rounded flex items-center justify-center text-7xl ${props.yourTurn && "cursor-pointer hover:opacity-[0.5]"}`} onClick={() => props.onClick()}>{props.value}</div>
    )
}