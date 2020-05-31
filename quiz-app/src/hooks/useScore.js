import {useContext} from "react"
import {AppContext} from "../components/Context"

function useScore(){

    const {photos, score, scoreMessages, resultsModalMessages} = useContext(AppContext)
    const maxPossibleScore = photos.length

    function getResultsContent(){
        const percent = score / maxPossibleScore

        if (percent === undefined || Number.isNaN(percent)){
            return {
                scoreMessage: "", 
                resultsModalTitle: "",
                resultModalUrl: ""
            }

        } else if (percent <= scoreMessages.badScoreMax) {
            return {
                scoreMessage: scoreMessages.badMessage, 
                resultsModalTitle: resultsModalMessages.badResult.message,
                resultModalUrl: resultsModalMessages.badResult.url
            }

        } else if (percent > scoreMessages.badScoreMax && percent <= scoreMessages.okScoreMax) {
            return {
                scoreMessage: scoreMessages.okMessage,
                resultsModalTitle: resultsModalMessages.okResult.message,
                resultModalUrl: resultsModalMessages.okResult.url
            }

        } else if (percent > scoreMessages.okScoreMax && percent <= scoreMessages.goodScoreMax) {
            return {
                scoreMessage: scoreMessages.goodMessage,
                resultsModalTitle: resultsModalMessages.goodResult.message,
                resultModalUrl: resultsModalMessages.goodResult.url
            }

        } else if (percent > scoreMessages.goodScoreMax) {
            return {
                scoreMessage: scoreMessages.greatMessage,
                resultsModalTitle: resultsModalMessages.greatResult.message, 
                resultModalUrl: resultsModalMessages.greatResult.url
            }
        }
    }

    const {scoreMessage, resultsModalTitle, resultModalUrl} = getResultsContent()

    return {score, maxPossibleScore, scoreMessage, resultsModalTitle, resultModalUrl}
}

export default useScore