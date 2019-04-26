import React from 'react'
import v4 from 'uuid'

const Definition = (props) => {
    return (
        <>
        <div style={{ display: 'flex' }}>
            <h1 style={{ marginBottom: '10px' }}>{ props.word }</h1>
            <h4 style={{ marginLeft: '5px' }}>[ { props.phonetic.join(' | ') } ]</h4>
        </div>

        { 
            Object.keys(props.meaning).map(type => {
                return <div key={ v4() }>
                    <p style={{ fontStyle: 'italic' }}>{ type }</p>
                    <ol>
                        { props.meaning[type].map(def => <li key={ v4() }>{ def.definition }</li>)}
                    </ol>
                </div>
            }) 
        }
        </>
    )
}

export default Definition