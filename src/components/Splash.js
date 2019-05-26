import React, { useState } from 'react'

import { Switch, Route } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

const Splash = ({ history }) => {
    if (localStorage.getItem('token')) history.push('/')

    const [animationLogoEnd, setAnimationLogoEnd] = useState(false)

    return (
        <div className='logo-container'>
            <svg viewBox="0 0 1418 150" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" fill="none" fillRule="evenodd" fillOpacity="0">
                    <text id="lexi" stroke="#000" fill="#fff" fontWeight="normal" fontFamily="Tangerine" fontSize="130">
                        <tspan x="43%" y="109">
                            <tspan>l</tspan>
                            <tspan> </tspan>
                            <tspan>e</tspan>
                            <tspan> </tspan>
                            <tspan>x</tspan>
                            <tspan> </tspan>
                            <tspan>i</tspan>
                            <tspan> </tspan>
                            <tspan 
                                onAnimationEnd={() => setAnimationLogoEnd(true)}
                            >.</tspan>
                        </tspan>
                    </text>
                </g>
            </svg>
        {/*</div>
        <div className='wrapper flex center column'>
            <h1 className='app-header app-logo'>l e x i .</h1>*/}
            { 
                animationLogoEnd 
                &&
                <>
                <p className='springy-text'>
                    test the depth of your vocabulary
                </p>
                <Route exact path='/login' render={ (routeProps) => <Login { ...routeProps } /> } />
                <Route path='/login/register' render={ (routeProps) => <Register { ...routeProps } /> } />
                </>
            }
        </div>
    )
}

export default Splash