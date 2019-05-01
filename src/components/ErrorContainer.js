import React from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'

import Error from './Error'

const ErrorContainer = ({ errors }) => {
    const renderErrors = () => errors.map(e => <Error key={v4()} {...e} />)
    
    return (
        <div className='flex center'>
            <div className={ errors.length > 0 ? "error-message flex column center" : "display-none" }>
                { renderErrors() }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps)(ErrorContainer)