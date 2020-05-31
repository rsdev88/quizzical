import React from "react"
import PropTypes from "prop-types"


function SmallPhoto ({thumbnail, id}){

    return(
           <img
                className="image-grid" 
                src={thumbnail} 
                alt={`Grid image ${id}`} />
    )
}

export default SmallPhoto

SmallPhoto.propTypes = {
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}