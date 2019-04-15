import React from 'react'
import Error from './Error'
import v4 from 'uuid'

const ErrorContainer = (props) => {
    const renderErrors = () => props.errors.map(e => <Error key={v4()} {...e} />)
 
    return (
        <div style={
            props.errors.length > 0 ?
            { border: '1px solid black', display: 'flex', justifyContent: 'center', margin: '5px' }
            :
            { display: 'none' }
        }>
            { renderErrors() }
        </div>
    )
}

export default ErrorContainer