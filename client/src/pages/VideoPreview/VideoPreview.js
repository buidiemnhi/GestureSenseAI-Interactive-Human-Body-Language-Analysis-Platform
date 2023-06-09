import React, {
  useEffect,
  useState,
} from 'react';

import { BiArrowBack } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import {
  Navigate,
  useParams,
} from 'react-router-dom';

import Footer from '../landingPage/components/Footer/Footer';

function VideoPreview() {
    const [vids,setVids] = useState()
    const { id } = useParams();
    const [isdata,setIsData] = useState(false)

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

    const goBack = () => {
    window.history.back();
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:5000//videos/${id}`)
        .then(response => response.json())
        .then(data => {
            const videos = data.Data
            if(videos.length){
                setIsData(true)
            }
            setVids(videos)
        })
    }, [Navigate])

  return (
    <div>
    <div className='py-4'>

      <div className='justifying'>

        <div className='mx-1 d-flex'>
            <h3 className='my-auto growbig'>
                <BiArrowBack onClick={goBack}/>
            </h3>
        </div>
        <div className='mx-auto'>
            <h1 className='display-8'>
                You are reviewing omar hanafy's videos
            </h1>
        </div>
        <div className='mx-1 d-flex'>
            <h3 className='my-auto'>

            </h3>            
        </div>

      </div>

      <hr />

      <div className="row w-100 mx-auto h-100">
{   isdata   ?
            <>
            {
                vids.map((video)=>{
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
            }
            </>
        : <div className='col-12 mx-auto d-flex '><img src={process.env.PUBLIC_URL + '/imgs/2953962.jpg'} className='w-50 mx-auto'/></div>
}
      </div>

    </div>
    <Footer/>
    </div>
  )
}

export default VideoPreview