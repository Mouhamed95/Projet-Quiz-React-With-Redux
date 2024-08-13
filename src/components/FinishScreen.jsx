import ResetButton from "./ResetButton";


function FinishScreen({points, maxPoints,highscored,dispatch}) {
const pourcentage = (points / maxPoints) * 100

let emoji ;
if(pourcentage=== 100) emoji="🏆"
if(pourcentage >= 80 && pourcentage <100) emoji ="🛕"
if(pourcentage >= 50 && pourcentage <80) emoji ="😉"
if(pourcentage >= 0 && pourcentage <50) emoji = "😣"
if(pourcentage === 0) emoji = "😥"

    return (
        <>
        <p className="result">
       <span>{emoji}</span>     You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(pourcentage)}%)
        </p>
        <p className="highscore">(Highscore: {highscored} points)</p>
        <ResetButton dispatch={dispatch} />
        </>
    )
}

export default FinishScreen
