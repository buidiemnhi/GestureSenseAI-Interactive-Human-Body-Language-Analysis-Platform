import React from 'react';

export default function SecoundPhase(props) {

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        props.setFullInputData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    return (
        <div className='SecoundPhase mt-5'>
            <div className='row '>
                <div className='col-8'>
                    <h2>Detalis</h2>
                    <div className='input-group'>
                        <label className='input-group mt-3'>Title:</label>
                        <input
                            name='videoTitle'
                            type="text"
                            className=' no-box-shadow form-control'
                            placeholder="Enter video title"
                            value={props.fullInputData.videoTitle}
                            onChange={handleChange}
                        />
                        <label className='input-group mt-4'>Description:</label>
                        <textarea
                            name='videoDescription'
                            className='no-box-shadow form-control'
                            rows={5}
                            placeholder="Enter video description"
                            value={props.fullInputData.videoDescription}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-check mt-2">
                    <input
                        name='IsShowLandmarksSelected'
                        className="form-check-input "
                        type="checkbox"
                        style={{width: '1em', height: '1em'}}
                        checked={props.fullInputData.IsShowLandmarksSelected}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Add landmarks to the Video ?</label>
                    </div>

                    <button className='mt-4 btn blackbg white px-4 py-2' onClick={()=>props.SubmitVideoData()} > Submit the Video</button>

                </div>
                <div className='col-4 '>
                    <h4 className='mb-3'>preview Video</h4>
                    <div className='previewVideoSection'>
                        <div className='' >
                            <video autoPlay loop muted className="video-bg previewVideo">
                                <source src={props.videoUrl} type="video/mp4" />
                            </video>
                        </div>
                        <div className='mt-3'>
                            <p> Video URL:  <span className='text-muted'>{props.videoUrl}</span></p>
                            <p>Video Current Name: <span className='text-muted'>{props.fullInputData.video.name}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
