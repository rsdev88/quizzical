import React, {useContext} from "react"
import { AppContext } from "./Context"
import useScore from "../hooks/useScore"

function Score(){

    const {allQuestionsAnswered, allAnswersSubmitted, markQuiz } = useContext(AppContext)
    const {score, maxPossibleScore, scoreMessage} = useScore()

    return(
          allQuestionsAnswered && 
            <div className="score-container">
                { !allAnswersSubmitted &&
                    <button 
                        onClick={() => markQuiz()}
                        className="score-button">
                        Check answers!
                    </button>
                }
                { allAnswersSubmitted &&
                    <>
                        <p className="score-result">{score}/{maxPossibleScore}</p>
                        <p className="score-message">{scoreMessage}</p>
                    </>
                }
            </div>
    )


}

export default Score