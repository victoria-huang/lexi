import React from 'react' 

const Error = (props) => {
    return ( 
        <div>       
            <img height='12px' width='12px' style={{ paddingTop: '2px', marginRight: '2px' }} src={require('../assets/images/ban-sign.png')} />
            { props.message }
        </div>
    )
}

export default Error