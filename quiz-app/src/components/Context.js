import React, {useState, useEffect} from "react"
import appDataJSON from "../appData.json"

const AppContext = React.createContext()

function AppProvider(props){

    const answerPatterns = {
        REGEX: "regex",
        ARRAY: "array"
    }

    const [photos, setPhotos] = useState([])
    const [headerEmoji, setHeaderEmoji] = useState("")
    const [scoreMessages, setScoreMessages] = useState({})
    const [resultsModalMessages, setResultsModalMessages] = useState({})
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)
    const [allAnswersSubmitted, setAllAnswersSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        setHeaderEmoji(appDataJSON.headerEmoji)
        setScoreMessages(appDataJSON.score)
        setResultsModalMessages(appDataJSON.resultsModal)
        setPhotos(appDataJSON.photos)
    }, [])

    useEffect(() => {

        if (photos.length > 0 && photos.some(photo => photo.guess === "") === false){
            setAllQuestionsAnswered(true)
        } 

    }, [photos])

    function markAnswers(){
        const newPhotosArray = [...photos].map(photo => ({...photo, isCorrect: markAnswer(photo.answer, photo.guess)}))
        setPhotos(newPhotosArray)

        return newPhotosArray.filter(photo => photo.isCorrect).length
    }

    function markAnswer(answer, guess){
        if (answer.answerPattern === answerPatterns.ARRAY){
            return answer.possibleAnswers.includes(normaliseGuess(guess))
        }
        else if (answer.answerPattern === answerPatterns.REGEX)
        {
            const matches = normaliseGuess(guess).match(answer.possibleAnswers)
            return matches === null ? false : true
        }
    }

    function normaliseGuess(guess){
        return guess.trim().replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
    }

    function markQuiz(){
        setScore(markAnswers())
        setAllAnswersSubmitted(true)
        setIsModalOpen(true)
    }  

    return(
        <AppContext.Provider value={{
            photos, 
            headerEmoji,
            scoreMessages, 
            allQuestionsAnswered, 
            score, 
            resultsModalMessages, 
            allAnswersSubmitted, 
            isModalOpen,
            setPhotos, setAllAnswersSubmitted, markQuiz, setIsModalOpen}}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContext, AppProvider}