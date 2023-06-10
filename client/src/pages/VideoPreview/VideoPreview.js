import React, {
  useEffect,
  useState,
} from 'react';

import { FaTrash } from 'react-icons/fa';
import {
  Navigate,
  useParams,
} from 'react-router-dom';

function VideoPreview(props) {
    const [vids,setVids] = useState()
    const { id,first,second } = useParams();
    const [isdata,setIsData] = useState(false)
    const [vidsCount,setVidsCount] = useState(0)
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [userName,setUserName]= useState('')
    console.log(vids)

    function handleDelete(vid_id){
        let jwtToken = localStorage.getItem('jwt_token');
        fetch(`http://127.0.0.1:5000//del-vid/${vid_id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            },
        })
        .then(response => response.json())
        .then(res=>console.log(res))
        .then(res=>{
            const updatedVideos = vids.filter((video) => video.video_id !== vid_id);
            setVidsCount(prevCount=>{return prevCount-1})
            if(updatedVideos.length===0)setIsData(false)
            setVids(updatedVideos);
        })
    }

    const goBack = () => {
    window.history.back();
    };

    useEffect(() => {
      let jwtToken = localStorage.getItem('jwt_token');
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${jwtToken}`);
      myHeaders.append("Cookie", `session=.${jwtToken}`);
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
        fetch(`http://127.0.0.1:5000//videos/${props.id}`,requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const videos = data.Data
            setUserName(data.username)
            if(videos.length>0){
                setIsData(true)
                setVidsCount(videos.length)
            }
            setVids(videos)
        })
    }, [Navigate])


  const openDeleteModal = (vid) => {
    setSelectedVideo(vid)
    const deleteModalElement = document.getElementById("deleteModal");
    const deleteModal = new window.bootstrap.Modal(deleteModalElement);
    deleteModal.show();
  };

  return (
    <div>
    <div className=''>

      <div className='justifying py-4 '>
        <div className='mx-auto'>
            <h1 className='display-8'>
                You are reviewing {userName}'s videos
            </h1>
        </div>
        <div className='mx-2 d-flex'>
            <h3 className='my-auto'>
                {vidsCount} Videos
            </h3>            
        </div>

      </div>

      <div className="row w-100 mx-auto my-5">
{   isdata   ?
            <>
            {
                vids.map((video)=>{
                return(
                    <div className="col-md-4 d-flex mb-3 my-2" key={video.video_id}>
                        <div className="card w-75  mx-auto Brounded shadow-lg" >
                            <video src={video?.URL} className="object-fit-contain w-100 p-4" autoPlay controls />
                            <div className="card-body hight-fit">
                                <h5 className="card-title fw-bold">{video.video_title}</h5>
                                <p className="card-text fw-semibold">{video.video_description}</p>
                                <p className="card-text fw-semibold">Video duration : {video.video_duration}</p>
                                <p className="card-text fw-semibold">Upload date : {video.uploaded_date}</p>
                                <button className='btn btn-danger d-flex flex-row align-items-center align-middle p-2' onClick={()=>openDeleteModal(video.video_id)}>
                                    <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
            }
            </>
        : <div className='col-12 mx-auto d-flex '><img src={process.env.PUBLIC_URL + '/imgs/2953962.jpg'} className='w-50 mx-auto'/></div>
}
      </div>

{/* modal */}

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
                  onClick={() => handleDelete(selectedVideo)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
    </div>

{/* end modal */}

    </div>
    </div>
  )
}

export default VideoPreview