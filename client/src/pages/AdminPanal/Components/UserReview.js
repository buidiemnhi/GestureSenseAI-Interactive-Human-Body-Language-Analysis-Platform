import React, {
  useEffect,
  useState,
} from 'react';

import { FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

function UserReview(props) {
    const [users,setUsers] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isdata,setIsData] = useState(false)
    const [usersCount,setUsersCount] = useState(0)

    function handleDelete(id){
      let jwtToken = localStorage.getItem('jwt_token');
        console.log(id)
        fetch(`http://127.0.0.1:5000//del-usr/${id}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${jwtToken}`,
            },
        })
        .then(response => response.json())
        .then(res=>{
            const updatedUsers = users.filter((user) => user.user_id != id);
            setUsers(updatedUsers)
            setUsersCount(prevCount=>(prevCount-1))
            if(updatedUsers.length===0){
              setUsersCount(0)
              setIsData(false)
            }
        })
    }

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
        fetch('http://127.0.0.1:5000//users',requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.Data)
            setUsers(data.Data)
            const usersL = data.Data
            if(usersL.length>0){
              setIsData(true)
            }
            setUsersCount(usersL.length)
        })
    }, [])

  const openDeleteModal = (vid) => {
    setSelectedVideo(vid)
    const deleteModalElement = document.getElementById("deleteModal");
    const deleteModal = new window.bootstrap.Modal(deleteModalElement);
    deleteModal.show();
  };

  function UserVideos(userID){
    props.changeUserId(userID)
  } 


  return (
    <>  
      <div className='w-100 d-flex justify-content-between'>
        <h3 className='my-4'>Users in the system</h3>
        <h3 className='my-4'>{usersCount} users</h3>
      </div>
      { isdata ?
        <table class="table table-striped mx-auto">
                <thead className=''>
                  <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">First name</th>
                      <th scope="col">Last name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Birthday</th>
                      <th scope="col">Last sign in</th>
                      <th scope="col">Last Activity</th>
                      <th scope="col">Activity</th>
                      <th scope="col-span-2">Actions</th>
                  </tr>
               </thead>
               <tbody>
                {
                  users.map((user)=>{
                    return(
                        <tr key={user.user_id}>
                            <th scope="row align-middle" className='align-middle text-center'>{user.user_id}</th>
                            <td class="align-middle text-center">{user.first_name}</td>
                            <td class="align-middle text-center">{user.last_name}</td>
                            <td class="align-middle">{user.user_email}</td>
                            <td class="align-middle">{user.user_birthdate}</td>
                            <td class="align-middle text-center">{user.lastLogin}</td>
                            <td class="align-middle">{user.last_activity}</td>
                            <td className='align-middle text-center'>
                              {user.isOnline ? <span className='btn btn-success isonline'></span> : <span className='btn btn-secondary isonline'></span>}
                            </td>
                            <td>
                            <button className='btn btn-danger fs-6 d-flex flex-row justify-content-center align-items-center align-middle grow mb-2 w-100 ' onClick={()=>openDeleteModal(user.user_id)}>
                            <FaTrash className='fs-6' /> <h6 className='my-auto ml-1 fs-6'>Delete</h6>
                            </button>
                            <button onClick={()=>UserVideos(user.user_id)} className='btn btn-primary grow fs-6'>
                              view videos
                            </button>
                            </td>
                        </tr>
                    )
                  })
                }
               </tbody>
        </table>
        : <img src={process.env.PUBLIC_URL + '/imgs/3024051.jpg'} className='w-50 my-auto mx-auto'/>
      }

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


<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />

    </>
  )
}

export default UserReview
