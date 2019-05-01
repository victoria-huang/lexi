import React from 'react' 

const Error = ({ message }) => {
    return ( 
        <div>       
            <img 
                alt='error' 
                className='error'
                src='ban-sign.png' 
            />
            { message }
        </div>
    )
}

export default Error