import React, {
  useEffect,
  useState,
} from 'react';

import { FaTrash } from 'react-icons/fa';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

function VideoPreview() {
    const [vids,setVids] = useState()
    const { id } = useParams();
<<<<<<< Updated upstream

=======
    const [isdata] = useState(false)
    const naviagte = useNavigate()
>>>>>>> Stashed changes
    function handleDelete(vid_id){
        fetch(`http://127.0.0.1:5000//del-vid/${vid_id}`, {
            method: 'DELETE',
            // headers: {
            // 'Content-Type': 'application/json',
            // },
        })
        .then(response => response.json())
        .then(res=>console.log(res))
        .then(res=>{
            setVids(vids.filter(vids => vids.video_id !== id));
        })

    }
<<<<<<< Updated upstream
    
=======


    const goBack = () => {
    window.history.back();
    };
>>>>>>> Stashed changes


    useEffect(() => {
        if(localStorage.getItem('isAdmin')==="false"){
            fetch(`http://127.0.0.1:5000//videos/${id}`)
        .then(response => response.json())
        .then(data => {
            const videos = data.Data
            console.log(videos)
            const videossArr = videos.map((video)=>{
                return(
                <div className="col-md-4 d-flex mb-3 " key={video.video_id}>
                    <div className="card w-75 mx-auto Brounded shadow-lg" >
                        <video src={video.URL} className="object-fit-contain w-100 p-4" autoPlay controls />
                        <div className="card-body">
                            <h5 className="card-title fw-bold">{video.video_title}</h5>
                            <p className="card-text fw-semibold">{video.video_description}</p>
                            <p className="card-text fw-semibold">Video duration : {video.video_duration}</p>
                            <p className="card-text fw-semibold">Upload date : {video.uploaded_date}</p>
                            <button className='btn btn-danger d-flex flex-row align-items-center align-middle p-2' onClick={()=>handleDelete(video.video_id)}>
                                <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                            </button>
                        </div>
                    </div>
                </div>
                )
            })
            setVids(videossArr)
        })
        }else{
            naviagte('/profilepage')
        }
    }, [])

  return (
    <div className=' py-4'>
      <div className='d-flex justify-content-center'>
        <h1 className='display-4'>
          Review omar hanafy's videos
        </h1>
      </div>
      <hr />

      <div className="row w-100">
        {/* <div className="col-md-4 d-flex mb-3">
        <div className="card w-75 mx-auto Brounded shadow-lg" >
            <video src={process.env.PUBLIC_URL + '/videos/bg.mp4'} className="object-fit-contain w-100 p-4 " autoPlay loop controls />
            <div className="card-body">
                <h5 className="card-title fw-bold">Card title</h5>
                <p className="card-text fw-semibold">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p className="card-text fw-semibold">duration : 1 min 26 sec</p>
                <p className="card-text fw-semibold">Release date : 12/5/2001</p>
                <button className='btn btn-danger d-flex flex-row align-items-center align-middle p-2' onClick={()=>handleDelete(id)}>
                    <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                </button>
            </div>
        </div>
        </div>
        <div className="col-md-4 d-flex mb-3 ">
        <div className="card w-75 mx-auto Brounded shadow-lg" >
            <video src={process.env.PUBLIC_URL + '/videos/bg.mp4'} className="object-fit-contain w-100 p-4" autoPlay loop controls />
            <div className="card-body">
                <h5 className="card-title fw-bold">Card title</h5>
                <p className="card-text fw-semibold">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p className="card-text fw-semibold">duration : 1 min 26 sec</p>
                <p className="card-text fw-semibold">Release date : 12/5/2001</p>
                <button className='btn btn-danger d-flex flex-row align-items-center align-middle p-2' onClick={()=>handleDelete(id)}>
                    <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                </button>
            </div>
        </div>
        </div>
        <div className="col-md-4 d-flex mb-3 ">
        <div className="card w-75 mx-auto Brounded shadow-lg" >
            <video src={process.env.PUBLIC_URL + '/videos/bg.mp4'} className="object-fit-contain w-100 p-4" autoPlay loop controls />
            <div className="card-body">
                <h5 className="card-title fw-bold">Card title</h5>
                <p className="card-text fw-semibold">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p className="card-text fw-semibold">duration : 1 min 26 sec</p>
                <p className="card-text fw-semibold">Release date : 12/5/2001</p>
                <button className='btn btn-danger d-flex flex-row align-items-center align-middle p-2' onClick={()=>handleDelete(2)}>
                    <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                </button>
            </div>
        </div>
        </div>
        <div className="col-md-4 d-flex mb-3 ">
        <div className="card w-75 mx-auto Brounded shadow-lg" >
            <video src={process.env.PUBLIC_URL + '/videos/bg.mp4'} className="object-fit-contain w-100 p-4" autoPlay loop controls />
            <div className="card-body">
                <h5 className="card-title fw-bold">Card title</h5>
                <p className="card-text fw-semibold">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p className="card-text fw-semibold">duration : 1 min 26 sec</p>
                <p className="card-text fw-semibold">Release date : 12/5/2001</p>
                <button className='btn btn-danger d-flex flex-row align-items-center align-middle p-2' onClick={()=>handleDelete(4)}>
                    <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                </button>
            </div>
        </div>
        </div>
        <div className="col-md-4 d-flex mb-3 ">
        <div className="card w-75 mx-auto Brounded shadow-lg" >
            <video src={process.env.PUBLIC_URL + '/videos/bg.mp4'} className="object-fit-contain w-100 p-4" autoPlay loop controls />
            <div className="card-body">
                <h5 className="card-title fw-bold">Card title</h5>
                <p className="card-text fw-semibold">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p className="card-text fw-semibold">duration : 1 min 26 sec</p>
                <p className="card-text fw-semibold">Release date : 12/5/2001</p>
                <button className='btn btn-danger d-flex flex-row align-items-center align-middle p-2'>
                    <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                </button>
            </div>
        </div>
        </div> */}
        {vids}
      </div>
    </div>
  )
}

export default VideoPreview