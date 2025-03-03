export default function GridPlate(props: {yourTurn: boolean, value: string}){

    return (
        <div className={`bg-[lightblue] border rounded flex items-center justify-center text-7xl ${props.yourTurn && "cursor-pointer hover:opacity-[0.5]"}`}>{props.value}</div>
    )
}