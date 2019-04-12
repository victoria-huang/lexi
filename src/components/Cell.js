import React, { Component } from 'react'

class Cell extends Component {
    state = {
        value: ''
    }

    render() {
        return (
            <>
               <rect
                    className="rect-svg"
                    x={this.props.x}
                    y={this.props.y}
                    width='10'
                    height='10'
                    stroke="black"
                    strokeWidth='0.5'
                    fill="white"
                    opacity="0.8"
                />
            </>
        )
    }
}

export default Cell