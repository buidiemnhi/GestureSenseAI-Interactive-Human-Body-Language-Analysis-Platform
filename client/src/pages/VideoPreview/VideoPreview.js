import React, {
  useEffect,
  useState,
} from 'react';

import { FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function VideoPreview() {
    const [vids,setVids] = useState()
    const { id } = useParams();

    function handleDelete(id){
        console.log(id)
        fetch("")
        .then()
        .then()
    }
    
    useEffect(() => {
        fetch("")
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
        <div className="col-md-4 d-flex mb-3">
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
        </div>
      </div>
    </div>
  )
}

export default VideoPreview