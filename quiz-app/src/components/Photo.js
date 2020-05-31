import React, {useState, useContext} from "react"
import PropTypes from "prop-types"
import Polaroid from "./Polaroid"
import SmallPhoto from "./SmallPhoto"
import { AppContext } from "./Context"

function Photo (props){

    const {allAnswersSubmitted} = useContext(AppContext)
    const [isExpanded, setIsExpanded] = useState(false)

    function toggleIsExpanded(){
        setIsExpanded(prevIsExpanded => !prevIsExpanded)
    }

    function imageElement(){
        if(isExpanded){
            return <Polaroid key={props.photo.id} activePhotoId={props.photo.id} toggleIsExpanded={toggleIsExpanded}/>
        } else {
            return <SmallPhoto key={props.photo.id} thumbnail={props.photo.thumbnail} id={props.photo.id}/>
        } 
    } 

    function additionalClassName(){
        if(allAnswersSubmitted){
            return props.photo.isCorrect ? "image-container-correct" : "image-container-incorrect"
        } else {
            return props.photo.guess === "" ? "" : "image-container-answered"
        }
    }

    return(
        <div className={isExpanded ? "polaroid-container" : `image-container ${additionalClassName()}`} 
            onClick={isExpanded ? undefined : toggleIsExpanded} >
            {imageElement()}
        </div>
    )
}

Photo.propTypes = {
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
        isCorrect: PropTypes.bool
    }).isRequired
}

export default Photo