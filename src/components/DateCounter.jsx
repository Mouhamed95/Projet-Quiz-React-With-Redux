
import { useReducer} from "react";
 
 const initialState = {
  count : 0,
  step: 1
 }

function reducer (state, action) {
  console.log(state, action);

  // return {count : 0, step : 1};

   switch (action.type) {
    case "inc":
      return {...state, count: state.count + state.step}
    case "dec":
      return {...state, count : state.count - state.step}
    case "setCount":
      return {...state, count : action.payload}  
    case "reset":
      return initialState  
      default:
      throw new Error("Pas d'action")   
    
   }

 
}

function DateCounter() {

 const [states, dispatch] = useReducer(reducer, initialState)
 console.log(states)
 //destructuration de l'objet
   const {count, step } = states
 
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2024");
  date.setDate(date.getDate() + count);
  console.log(date)

  const dec = function () {
      dispatch({type: "dec" })
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({type: "inc"})
    
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
  dispatch({type: "setCount", payload: Number(e.target.value)})

    // setCount(Number(e.target.value));
  
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({type: "setStep", payload: Number(e.target.value)})
  };

  const reset = function () {
    dispatch({type:"reset"})
    // setCount(0);
    // setStep(1);
    
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;





// function Date(){



// const [state, dispatch] = useReducer(reducer, initialState) 


// return(
//   <div>

//   </div>
// )


// }

const nom ={
  prenom:"Moustapha",
  adresse:"point-e"
}

nom.prenom='lo'









const etudiant = {
  prenom :"x",
  nom: "y"
}

// const {name , adresse} = etudiant

const etudiant1 = {...etudiant, prenom:"Z"} 
console.log(etudiant1, etudiant)
