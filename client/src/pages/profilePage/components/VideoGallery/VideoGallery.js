import { React, useEffect, useState } from "react";
import "./VideoGallery.css";

import sampleVTT from "../Dashboard/components/VideoStatistics/Sample.vtt";

import {
  BigPlayButton,
  ClosedCaptionButton,
  ControlBar,
  Player,
} from "video-react";

//import sampleVTT from '../../../Sample.vtt'

export default function VideoGallery() {
  const [videos, setvideos] = useState([]);
  console.log(videos);
  useEffect(() => {
    async function fetchData() {
      try {
        let jwtToken = localStorage.getItem("jwt_token");
        const response = await fetch("http://127.0.0.1:5000//display-videos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `session=.${jwtToken}`,
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        let data = await response.json();
        setvideos(data.videos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  // deleteVideo function
  const deleteVideo = (id) => {
    console.log(id)
    fetch(`http://127.0.0.1:5000//del-vid/${id}`, {
        method: 'DELETE',
        // headers: {
        // 'Content-Type': 'application/json',
        // },
    })
    .then(response => response.json())
    .then(res=>console.log(res))
    .then(res=>{
      console.log(res);
       // assume the server returns {success: true} when deletion is successful
      setvideos(videos.filter(video => video.video_id !== id));
      
  })

  };

  const vids = videos.map((video, index) => (
    <div key={index} className="col-4 videoGallrayObj">
      <div className=" m-2">
        <video
          className=""
          muted
          controls
          width="100%"
          height="280"
          playsInline
          src={video.URL}
          crossOrigin="anonymous"
        >
          {video.subtitles.map((subtitle, subtitleIndex) =>
            Object.values(subtitle).map((subtitleUrl, urlIndex) => (
              <track
                key={`subtitle${subtitleIndex}-${urlIndex}`}
                src={subtitleUrl}
                kind="subtitles"
                srcLang="en" 
                label={` ${subtitleIndex === 1  ? "Body Language Decoded" : "Movements Decoded"}`}
              />
            ))
          )}
        </video>
        <h3 className="video-title my-2"> {video.video_title}</h3>
        <p className="">
          Description:{" "}
          <span className="text-muted"> {video.video_description} </span>
        </p>
        <button className="btn btn-danger px-3" onClick={() => deleteVideo(video.video_id)}>X</button>
      </div>
    </div>
  ));

  return (
    <div className="m-5 videoGallery">
      <div className="mt-3 d-flex justify-content-center">
        <h1 className="display-4">Video Gallery</h1>
      </div>
      <hr />

      <div className="row">
        {videos.length === 0 ? (
          <div className="w-100 margin-top d-flex align-items-center justify-content-center font-weight-bold">
            No videos to show
          </div>
        ) : (
          vids
        )}
      </div>
    </div>
  );
}
