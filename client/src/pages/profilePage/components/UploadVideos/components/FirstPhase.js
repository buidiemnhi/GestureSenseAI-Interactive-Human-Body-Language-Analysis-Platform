import React from 'react';

import { GoCloudDownload } from 'react-icons/go';

export default function FirstPhase(props) {
    let videoData = props.fullInputData.video

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile && selectedFile.type.includes('video')) {
          props.setFullInputData((prevData)=>{
            return {
              ...prevData,
              video : selectedFile
            }
          });
        props.setVideoUrlData(URL.createObjectURL(selectedFile))
        } else {
          alert('Please drop a video file');
        }
      };
    
      const handleDragOver = (event) => {
        event.preventDefault();
      };
    
      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.includes('video')) {
            props.setFullInputData((prevData)=>{
              return {
                ...prevData,
                video:selectedFile
              }
            });
            props.setVideoUrlData(URL.createObjectURL(selectedFile))
        } else {
          alert('Please select a video file');
        }
      };

  return (
    <div
    className="UploadVideos"
    onDrop={handleDrop}
    onDragOver={handleDragOver}
  >
    <label htmlFor="video-input">
    <div className="MainIconSection">
      <GoCloudDownload className="Icon" />
    </div>
    </label>
    <input
      type="file"
      name="video"
      id="video-input"
      accept="video/*"
      style={{ display: 'none' }}
      onChange={handleFileChange}
    />
    <h3 className="my-4">
      <b>Drop and drag file you want to upload </b>
    </h3>
    <p className="text-muted">
      Please wait after submiting the video and it will be inserted into your gallary
    </p>
    {videoData && (
      <div>
        <p>File selected: {videoData.name}</p>
      </div>
    )}
    <div>
      <button className="mt-3 btn blackbg white px-5 py-3" onClick={()=>props.MoveToSecoundPhase()}> Continue </button>
    </div>
  </div>
)
}
