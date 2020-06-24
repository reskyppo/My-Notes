import React from 'react'

const Button = ({title,onclick, loading}) => {
    if (loading) {
        return(
            <button 
                className = 'btn disable'
                onClick   = {onclick}
            >
                Loading....
            </button>
        )
    }
    return(
        <button 
            className = 'btn'
            onClick   = {onclick}
        >
            {title}
        </button>
    )
}

export default Button;