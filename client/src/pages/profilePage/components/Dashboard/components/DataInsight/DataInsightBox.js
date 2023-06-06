import React from 'react'

export default function DataInsightBox(props) {
    return (
        <div className='py-3 px-1 '>
            <h5 className='MainText '>{props.MainText} </h5>
            <div className='mt-2 md-5'>
                <p className='text-muted SecondaryText'>
                {props.SecondaryText}
                </p>
                <p>
                    {props.InfoText}
                </p>
            </div>
        </div>
    )
}
