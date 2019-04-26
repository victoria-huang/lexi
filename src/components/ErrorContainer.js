import React from 'react'
import v4 from 'uuid'

import { connect } from 'react-redux'

import Error from './Error'

const ErrorContainer = (props) => {
    const renderErrors = () => props.errors.map(e => <Error key={v4()} {...e} />)
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={
                props.errors.length > 0 ?
                { width: '70%', border: 'none', borderRadius: '4px', backgroundColor: 'rgb(252, 187, 187)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '3px', fontSize: '0.8em' }
                :
                { display: 'none' }
            }>
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