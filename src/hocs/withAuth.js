import React, { Component } from 'react'

import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import setAuthToken from '../utils/setAuthToken'

import { setCurrentUser } from '../actions'
import { LEXI_API } from '../constants'

const withAuth = (ComponentToWrap) => {
    return connect(null, { setCurrentUser })(withRouter(class extends Component {        
        state = { tokenSet: false }
        
        componentDidMount() {
            const token = localStorage.getItem('token')
            
            if (!token) {
                this.props.history.push('/login')
            } else {
                setAuthToken(token)
                const decodedUser = jwt_decode(token)

                axios.get(`${LEXI_API}/api/v1/users/${decodedUser.id}`)
                .then(res => {
                    this.props.setCurrentUser(res.data.user)
                    this.setState({ tokenSet: true })
                })
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
    }))
}

export default withAuth
  