import React, {useContext} from "react"
import {AppContext} from "./Context"
import Photo from "./Photo"
import Instructions from "./Instructions"

function Photos(){

    const {photos} = useContext(AppContext)

    const photoElements = photos.map((photo) => (
        <Photo key={photo.id} photo={photo} />
    ))

    return(
        <main>
            <Instructions/>
            <section className="photos">
                {photoElements}
            </section>

        </main>
    )
}

export default Photos