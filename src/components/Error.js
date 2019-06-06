import React from 'react' 

const Error = ({ message }) => {
    return ( 
        <div>       
            <img 
                alt='error' 
                className='error'
                src={ 'https://dl.dropboxusercontent.com/s/t7x57kh30spf44t/ban-sign.png' }
            />
            { message }
        </div>
    )
}

export default Error