import React, {useContext} from "react"
import Score from "./Score"

import {AppContext} from "./Context"

function Header(){

    const {headerEmoji} = useContext(AppContext)

    return(
        <header>
            <h2>Let's get QUIZZICAL<span className="header-emoji">{headerEmoji}</span></h2>
            <Score />
        </header>
    )
}

export default Header