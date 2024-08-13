import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NexButton from './NexButton'
import Progresse from './Progresse'
import FinishScreen from './FinishScreen'




const initialState ={
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished' 
  status:"loading", 
  index: 0,
  answer: null,
  points:0,
  highscored:0
}



 function reducer(state, action){
  console.log(state, action)
  switch (action.type) {
    case "dataReceived":
      return {...state,
        questions:action.payload,
        status:"ready"
       }
       case "dataFailed" :
        return {
          ...state,
          status:"error"
        }
        case "start":
          return{
            ...state,
            status: "active"
          }
          case "newAnswer":
            const question = state.questions.at(state.index)

            return{
              ...state,
              answer: action.payload,
              points: action.payload === question.correctOption ?
               state.points + question.points : state.points
            }
            case "nextQuestion": 
            return {
              ...state,
              index: state.index + 1,
              answer:null
            }
            case "finish":
              return {
                ...state,
                status:"finished",
                highscored: state.points > state.highscored ? state.point: state.highscored
              }
              case "restart":
                return {...initialState, 
                  questions:state.questions,
                  answer:null,
                  highscored:0,
                  points:0,
                  index:0,
                  status:"ready"
                }
    default:
      throw new Error("Action unkonwn")
  }
 }

export default function App(){

  const [states, dispatch] = useReducer(reducer, initialState)
  const {questions, status, index, answer, points,highscored} = states
  console.log(states)
  
  const numQuestion = questions.length

  const maxPossibilitePoints = questions.reduce((prev, curr)=> prev + curr.points, 0)

   useEffect(function(){
    fetch('http://localhost:9000/questions')
    .then(res=>res.json())
    .then(data=> dispatch({type: "dataReceived", payload:data}))
    .catch((err)=>dispatch({type: "dataFailed"}))

   }, [])
 
  return(
    <div className='app'>
       <Header/>
       <Main>
       {status === "loading" && <Loader/>}
       {status === "error" && <Error/>}
       {status === "ready" && 
       <>
       <StartScreen
        allquestion ={numQuestion} dispatch={dispatch}/> 
        
        </>}
      
       {status === "active" && (
        <>
          <Progresse index={index}
          numQuestion={numQuestion} 
          points={points}
          maxPoints={maxPossibilitePoints}
          answer={answer}
          />
          <Question question={questions[index]} dispatch={dispatch} answer={answer}
        />
          <NexButton dispatch={dispatch} answer={answer} index={index} numQuestion={numQuestion} />
          </>
          )}
          {status === "finished" && 
          <FinishScreen points={points} 
          maxPoints={maxPossibilitePoints} highscored={highscored} dispatch={dispatch} />}
       </Main>

    </div>
  )
}