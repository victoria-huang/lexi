import React, { Component } from 'react'

import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'

import setAuthToken from '../utils/setAuthToken'
import { setCurrentUser } from '../actions'

const withAuth = (ComponentToWrap) => {
    return connect(null, { setCurrentUser })(class extends Component {        
        state = { tokenSet: false }
        
        componentDidMount() {
            const token = localStorage.getItem('token')
            
            if (!token) {
                this.props.history.push('/login')
            } else {
                setAuthToken(token)
                const decodedUser = jwt_decode(token)
                this.props.setCurrentUser(decodedUser)
                this.setState({ tokenSet: true })
            }
        }

        render() {
            return (
                <div>
                    { 
                        this.state.tokenSet
                        && 
                        <ComponentToWrap {...this.props} /> 
                    }
                </div>
            )
        }
    })
}

export default withAuth
  