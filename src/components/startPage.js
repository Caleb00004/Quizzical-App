
export default function start(props) {

    return (
        <div className="startPage">
            <div className="startPage-el">
                <h1>Quizzical</h1>
                <p>A fun quiz game</p>
                <button onClick={props.Data}>Start quiz</button>
            </div>
        </div>
        
    )
}