import { React, useEffect, useState } from "react";
import "./VideoGallery.css";
/*global $ */

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
    console.log(id);
    fetch(`http://127.0.0.1:5000//del-vid/${id}`, {
      method: "DELETE",
      // headers: {
      // 'Content-Type': 'application/json',
      // },
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
      .then((res) => {
        console.log(res);
        // assume the server returns {success: true} when deletion is successful
        setvideos(videos.filter((video) => video.video_id !== id));
      });
  };

  const [selectedVideo, setSelectedVideo] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedVideo(id);
    const deleteModalElement = document.getElementById("deleteModal");
    const deleteModal = new window.bootstrap.Modal(deleteModalElement);
    deleteModal.show();
  };
  const vids = videos
    .slice()
    .reverse()
    .map((video, index) => (
      <div className="col-4">
        <div key={index} className=" videoGallrayObj mx-2">
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
                Object.values(subtitle)
                  .slice()
                  .reverse()
                  .map((subtitleUrl, urlIndex) => (
                    <track
                      key={`subtitle${subtitleIndex}-${urlIndex}`}
                      src={subtitleUrl}
                      kind="subtitles"
                      srcLang="en"
                      default={true}
                      label={` ${
                        subtitleIndex === 1
                          ? "Body Language Decoded"
                          : "Movements Decoded"
                      }`}
                    />
                  ))
              )}
            </video>
            <h3 className="video-title my-2 text-bold"> {video.video_title}</h3>
            <p className="">
              Description:{" "}
              <span className="text-muted"> {video.video_description} </span>
            </p>
            <p className="">
              Video Summary:{" "}
              <span className="text-muted"> {video.openai_meaning} </span>
            </p>
            <button
              className="btn btn-danger rounded-circle px-3"
              onClick={() => openDeleteModal(video.video_id)}
            >
              X
            </button>
          </div>
        </div>

        {/* The modal for deletion confirmation */}
        <div className="modal" id="deleteModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this video?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => deleteVideo(selectedVideo)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="m-5 videoGallery">
      <div className="mt-3 d-flex justify-content-center">
        <h1 className="display-5">Video Gallery</h1>
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
