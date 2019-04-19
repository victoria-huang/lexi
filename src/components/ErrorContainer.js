import React from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'

import Error from './Error'

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

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps)(ErrorContainer)