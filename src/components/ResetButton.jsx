function ResetButton({dispatch}) {
    return (
        <button className="btn btn-ui" 
        onClick={()=>dispatch({type:"restart"})}>
          RESTART
        </button>
    )
}

export default ResetButton
