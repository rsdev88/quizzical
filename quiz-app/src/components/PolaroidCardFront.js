import React from "react"
import PolaroidContent from "./PolaroidContent"
import PropTypes from "prop-types"

function PolaroidCardFront(props){

    const {
        toggleIsExpanded,
        activePhoto,
        guess,
        setGuess,
        handleSubmit,
        handleFocus,
        allAnswersSubmitted,
        saveButtonRef,
        isFlipped,
        setIsFlipped,
        leftArrow,
        rightArrow} = props

    return (

        <div className="polaroid polaroid-front">
            <span onClick={toggleIsExpanded} className="polaroid-close"><i className="ri-close-circle-line"></i></span>
            
            <PolaroidContent renderBack={false} photo={activePhoto} />

            { !allAnswersSubmitted &&
                <form className="polaroid-form" 
                        onSubmit={(event) => handleSubmit(event)}>
                    <input
                        type="text"
                        value={guess}
                        name="guess"
                        onChange={(event) => setGuess(event.target.value)}
                        onFocus={(event) => handleFocus(event)}
                        className="polaroid-input"
                        />
                        <button
                            className="polaroid-save-button button-secondary"
                            ref={saveButtonRef}>
                            Save answer
                        </button>
                </form>
            }

            <p className="polaroid-guess">Your {allAnswersSubmitted? "final" : "current"} guess: {activePhoto.guess}</p>
            
            { allAnswersSubmitted && 
                <>
                    <p className={`polaroid-result polaroid-result-${activePhoto.isCorrect ? "correct" : "incorrect"}`}>
                        {activePhoto.isCorrect ? "Correct! 🤓" : "Wrong! 💩" }
                    </p>
                    <button 
                        className="polaroid-button-flip button-secondary"
                        onClick={()=> setIsFlipped(!isFlipped)}>
                        Reveal answer
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

export default React.memo(PolaroidCardFront)

PolaroidCardFront.propTypes = {
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
    guess: PropTypes.string,
    setGuess: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    allAnswersSubmitted: PropTypes.bool.isRequired,
    saveButtonRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)}).isRequired,
    isFlipped: PropTypes.bool.isRequired,
    setIsFlipped: PropTypes.func.isRequired,
    leftArrow: PropTypes.element,
    rightArrow: PropTypes.element
}