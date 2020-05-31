import React, {useState, useEffect, useContext, useRef} from "react"
import {AppContext} from "./Context"
import PolaroidCardFront from "./PolaroidCardFront"
import PolaroidCardBack from "./PolaroidCardBack"
import PropTypes from "prop-types"

function Polaroid ({toggleIsExpanded, activePhotoId}){

    const {photos, setPhotos, allAnswersSubmitted} = useContext(AppContext)
    const [isFlipped, setIsFlipped] = useState(false)
    const [activePhoto, setActivePhoto] = useState(() => photos.find(photo => photo.id === activePhotoId))
    const [guess, setGuess] = useState(activePhoto.guess)

    const saveButtonRef = useRef(null)

    // - handle animations

    useEffect(() => {

        const handleKeyDown = (event) => {

            let currentFocusedElement = document.activeElement.name

            switch (event.keyCode){

                case 27: //Escape
                    toggleIsExpanded()
                    break

                case 39: //Right arrow
                    if(isNextPhotoAvailable() && currentFocusedElement !== "guess"){
                        getNextPhoto() 
                    }     
                    break

                case 37: //Left arrow
                    if(isPreviousPhotoAvailable() && currentFocusedElement !== "guess"){
                        getPreviousPhoto()
                    }             
                    break

                default:
                    break //Do nothing
            }}

            setGuess(activePhoto.guess)
            setIsFlipped(false)

            window.addEventListener('keydown', handleKeyDown)
        
            return () => {
            window.removeEventListener('keydown', handleKeyDown)
            }
        
      }, [activePhoto])

    function isNextPhotoAvailable(){
        const index = photos.findIndex(photo => photo.id === activePhoto.id)
        if(index === photos.length - 1){
            return false
        } 
        return true
    }

    function isPreviousPhotoAvailable()
    {
        const index = photos.findIndex(photo => photo.id === activePhoto.id)
        if(index === 0){
            return false
        }
        return true
    }

    function getNextPhoto(){
        const newPhotoId = Number(activePhoto.id) + 1
        const newPhoto = photos.find(photo => photo.id === newPhotoId.toString())
        setActivePhoto({...newPhoto})
    }

    function getPreviousPhoto(){

        const newPhotoId = Number(activePhoto.id) - 1
        const newPhoto = photos.find(photo => photo.id === newPhotoId.toString())
        setActivePhoto({...newPhoto})
    }

    function handleSubmit(e){
        e.preventDefault()
        
        const newPhotos = [...photos]
        const newPhoto = {... activePhoto, guess: guess}
        const index = photos.findIndex(photo => photo.id === activePhoto.id)
        newPhotos[index] = newPhoto

        setPhotos(newPhotos)
        setActivePhoto(newPhoto)
        saveButtonRef.current.focus()
    }

    function handleFocus(event){
        window.scrollTo(0, event.target.getBoundingClientRect().top)
    }

    const leftArrow = isPreviousPhotoAvailable() ? <span className = "polaroid-left-arrow" onClick={() => getPreviousPhoto()}><i className="ri-arrow-left-line"></i>Previous</span> : undefined
    const rightArrow = isNextPhotoAvailable() ? <span className = "polaroid-right-arrow" onClick={() => getNextPhoto()}>Next <i className="ri-arrow-right-line"></i></span> : undefined

    return(
        <div className={`polaroid-group ${isFlipped? "polaroid-group-flipped" : ""}`}>
            <PolaroidCardFront 
                toggleIsExpanded = {toggleIsExpanded}
                activePhoto = {activePhoto}
                guess = {guess}
                setGuess = {setGuess}
                handleSubmit = {handleSubmit}
                handleFocus = {handleFocus}
                allAnswersSubmitted = {allAnswersSubmitted}
                saveButtonRef = {saveButtonRef}
                isFlipped = {isFlipped}
                setIsFlipped = {setIsFlipped}
                leftArrow = {leftArrow}
                rightArrow = {rightArrow}            
            />

            {allAnswersSubmitted && 
                <PolaroidCardBack 
                    toggleIsExpanded = {toggleIsExpanded}
                    activePhoto = {activePhoto}
                    allAnswersSubmitted = {allAnswersSubmitted}
                    isFlipped = {isFlipped}
                    setIsFlipped = {setIsFlipped}
                    leftArrow = {leftArrow}
                    rightArrow = {rightArrow}   
                />
            }
        </div>
        

    )
}

export default Polaroid

Polaroid.propTypes = {
    toggleIsExpanded: PropTypes.func.isRequired,
    activePhotoId: PropTypes.string.isRequired
}