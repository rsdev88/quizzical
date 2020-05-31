import React from "react"
import PropTypes from "prop-types"

function PolaroidContent({renderBack, photo}){

    const types = {
        IMAGE: "image",
        AUDIO: "audio"
    }

    function buildContent() {
        if(renderBack){
            if (photo.answer.type === types.IMAGE){
                return <>
                        <img 
                            className="polaroid-image" 
                            src={photo.answer.url} 
                            alt={`Quiz answer ${photo.id}`} />
                        <p className="polaroid-answer">Answer: {photo.answer.message}</p>
                    </>
            } else if (photo.answer.type === types.AUDIO){
                return <>
                        <div className="polaroid-audio-container" style={{backgroundImage: `url(${photo.thumbnail})`}}>
                            <audio 
                                className="polaroid-audio"
                                src={photo.answer.url} 
                                controls/>
                        </div>
                        <p className="polaroid-answer">Answer: {photo.answer.message}</p>
                    </>
            }
    
        } else {
            if (photo.question.type === types.IMAGE){
                return <>
                        <img 
                            className="polaroid-image" 
                            src={photo.question.url} 
                            alt={`Quiz question ${photo.id}`} />
                        <p className="polaroid-question">{photo.question.message}</p>
                    </>
            } else if (photo.question.type === types.AUDIO){
                return <>
                        <div className="polaroid-audio-container" style={{backgroundImage: `url(${photo.thumbnail})`}} >
                            <audio 
                                className="polaroid-audio"
                                src={photo.question.url} 
                                controls/>
                        </div>
                        <p className="polaroid-question">{photo.question.message}</p>
                    </>
            }
        } 
    }

    return (buildContent())
}

PolaroidContent.propTypes = {
    photo: PropTypes.shape({
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
    renderBack: PropTypes.bool.isRequired
}

export default React.memo(PolaroidContent)