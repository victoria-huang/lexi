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
                [ { phonetic.join(' | ') } ]
            </h4>
        </div>

        { 
            Object.keys(meaning).map(type => {
                return <div key={ v4() }>
                    <p className='definition-type'>
                        { type }
                    </p>
                    <ol>
                        { meaning[type].map(def => <li key={ v4() }>{ def.definition }</li>)}
                    </ol>
                </div>
            }) 
        }
        </>
    )
}

export default Definition