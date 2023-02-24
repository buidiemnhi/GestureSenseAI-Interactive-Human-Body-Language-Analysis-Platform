import React from 'react'

export default function DataInsightBox(props) {
    return (
        <div className='p-4  '>
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
