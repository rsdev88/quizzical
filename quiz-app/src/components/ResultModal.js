import React, {useContext, useEffect} from "react"
import useScore from "../hooks/useScore"
import { AppContext } from "./Context"

function ResultsModal(){

    const {setIsModalOpen} = useContext(AppContext)
    const {score, maxPossibleScore, resultsModalTitle, resultModalUrl} = useScore()

    useEffect(() => {

        const handleKeyDown = (event) => {
            switch (event.keyCode){
                case 27: //Escape
                    setIsModalOpen(false)
                    break

                default:
                    break //Do nothing
            }}

            window.addEventListener('keydown', handleKeyDown)
        
            return () => {
            window.removeEventListener('keydown', handleKeyDown)
            }
        
      }, [])

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="modal-close" onClick ={() => setIsModalOpen(false)}><i className="ri-close-circle-line"></i></span>
                <div className="modal-flex">
                    <div className="modal-left">
                            <img className="modal-image" src={resultModalUrl} alt="result gif" />
                    </div>
                    <div className="modal-right">
                        
                        <h1 className="modal-title">{resultsModalTitle}</h1>
                        <p className="modal-score-before">Your score:</p>
                        <p className="modal-score"> {score} / {maxPossibleScore}</p>
                        <p className="modal-close-message">Close this window to go back to the quiz and reveal the answers.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultsModal