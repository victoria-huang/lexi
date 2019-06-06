import React from 'react'

import v4 from 'uuid'

const Definition = ({ word, phonetic, meaning }) => {
    return (
        <>
        <div className='flex'>
            <h1 className='definition-word'>
                { word }
            </h1>
            <h4 className='definition-phonetic'>
                [ { Array.isArray(phonetic) ? phonetic.join(' | ') : phonetic } ]
            </h4>
        </div>

        { 
            meaning.map(m => {
                return <div key={ v4() }>
                    <p className='definition-type'>
                        { m.meaningType }
                    </p>
                    <ol>
                        { m.definitions.map(def => <li key={ v4() }>{ def }</li>)}
                    </ol>
                </div>
            }) 
        }
        </>
    )
}

export default Definition