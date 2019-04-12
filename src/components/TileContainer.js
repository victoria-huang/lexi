import React, { Component } from 'react'
import { TILES } from '../constants'
import Tile from './Tile'

class TileContainer extends Component {
    state = {
        unusedTiles: [],
        playerTiles: [],
        usedTiles: []
    }

    componentDidMount() {
        this.setState({
            unusedTiles: this.createTileBag()
        }, () => { this.createHand() })
    }

    createTileBag = () => {
        let id = 1

        const tiles = TILES.map( t => {
            let newTiles = []

            for (let i = 0; i < t.amount; i++) {
                const newTile = {
                    id,
                    letter: t.letter,
                    points: t.points
                }

                newTiles.push(newTile)
                id++
            }

            return newTiles
        })

        const flattened = [].concat.apply([], tiles);

        return flattened
    }

    createHand() {
        let playerTiles = []
        let unusedTiles = [...this.state.unusedTiles]

        for (let i = 0; i < 7; i++) {
            const max = unusedTiles.length - 1
            const min = 0
            const randomIndex = Math.floor(Math.random() * (max - min) + min)
            const foundTile = unusedTiles[randomIndex]
            playerTiles.push(foundTile)
            unusedTiles = unusedTiles.filter(t => t !== foundTile)
        }

        this.setState({
            unusedTiles,
            playerTiles
        })
    }

    renderPlayerTiles = () => this.state.playerTiles.map( (t, idx) => <Tile key={ idx } letter={ t.letter } points={ t.points } /> )

    render() {
        return (
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                { this.state.playerTiles.length > 0 && this.renderPlayerTiles() }
            </div>
        )
    }
}   

export default TileContainer