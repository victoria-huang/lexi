import React, { Component } from 'react'

class Cell extends Component {
    render() {
        return (
            <g>
                <text x={ this.props.x + 3 } y={ this.props.y + 7 } fontFamily="Verdana" fontSize="5" fill="blue">{ this.props.value }</text>
                <text x={ this.props.x + 6 } y={ this.props.y + 3 } fontFamily="Verdana" fontSize="2.5" fill="red">{ this.props.points }</text>
                <rect
                    onClick={ () => this.props.handleClickCell(this.props.id, this.props.x, this.props.y) }
                    className="rect-svg"
                    x={this.props.x}
                    y={this.props.y}
                    width='10'
                    height='10'
                    stroke="black"
                    strokeWidth='0.5'
                    fill={ this.props.value ? "purple" : "white" }
                    opacity="0.3"
                />
            </g>
        )
    }
}

export default Cell