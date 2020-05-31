import React, {useState, useContext} from "react"

function Instructions(){
    
    const [isDisplayed, setIsDisplayed] = useState(true)

    const instructions = isDisplayed && 
        <div className="instructions">
            <h3>Instructions</h3>
            <ul>
                <li>Tap or click on each card answer the questions.</li>
                <li>You can only check your answers after answering all the questions.</li>
                <li>After you've got your score, you can reveal the correct answers.</li>
            </ul>
            <p style={{textAlign: "center"}}>Good luck!</p>
        </div>

    return(
        <section className="instructions-container">
            <button className={`instructions-button instructions-button-${isDisplayed ? "hide" : "show"}`} onClick={() => setIsDisplayed(prevIsDisplayed => !prevIsDisplayed)}>
                { isDisplayed ? "Hide instructions" : "Show instructions" }
            </button>
            {instructions}
        </section>
    )
}

export default Instructions