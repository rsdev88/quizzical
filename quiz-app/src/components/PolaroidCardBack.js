import React from "react"
import PolaroidContent from "./PolaroidContent"
import PropTypes from "prop-types"

function PolaroidCardBack(props){

    const {
        toggleIsExpanded,
        activePhoto,
        allAnswersSubmitted,
        isFlipped,
        setIsFlipped,
        leftArrow,
        rightArrow} = props
   
    return (
        <div className="polaroid polaroid-back">
            <span onClick={toggleIsExpanded} className="polaroid-close"><i className="ri-close-circle-line"></i></span>

            <PolaroidContent renderBack={true} photo={activePhoto} />

            <p className="polaroid-guess">Your final guess: {activePhoto.guess}</p>

            { allAnswersSubmitted && 
                <>
                    <p className={`polaroid-result polaroid-result-${activePhoto.isCorrect ? "correct" : "incorrect"}`}>
                        {activePhoto.isCorrect ? "Correct! 🤓" : "Wrong! 💩" }
                    </p>
                    <button 
                        className="polaroid-button-flip button-secondary"
                        onClick={()=> setIsFlipped(!isFlipped)}>
                        Show question
                    </button>
                </>
            }
            <div className="polaroid-arrows">
                {leftArrow}
                {rightArrow}
            </div>
        </div>
    )

}

export default React.memo(PolaroidCardBack)

PolaroidCardBack.propTypes = {
    toggleIsExpanded: PropTypes.func.isRequired,
    activePhoto: PropTypes.shape({
        id: PropTypes.string,
        question: PropTypes.shape({
            type: PropTypes.string,
            url: PropTypes.string,
            message: PropTypes.string
        }),
        answer: PropTypes.shape({
            type: PropTypes.string,
            url: PropTypes.string,
            message: PropTypes.string,
            answerPattern: PropTypes.string,
            possibleAnswers: PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.string),
                PropTypes.string
            ])
        }),
        guess: PropTypes.string,
        isCorrect: PropTypes.bool}).isRequired,
    allAnswersSubmitted: PropTypes.bool.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    setIsFlipped: PropTypes.func.isRequired,
    leftArrow: PropTypes.element,
    rightArrow: PropTypes.element
}