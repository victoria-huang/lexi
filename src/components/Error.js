import React from 'react' 

const Error = ({ message, nested }) => {
    return ( 
        <div>       
            <img 
                alt='error' 
                className='error'
                src={ nested ? '../ban-sign.png' : 'ban-sign.png' }
            />
            { message }
        </div>
    )
}

export default Error