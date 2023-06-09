import React, {
  useEffect,
  useState,
} from 'react';

import { FaTrash } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function UserReview() {
    const [users,setUsers] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null);

    function handleDelete(id){
        console.log(id)
        fetch(`http://127.0.0.1:5000//del-usr/${id}`, {
            method: 'DELETE',
            // headers: {
            // 'Content-Type': 'application/json',
            // },
        })
        .then(response => response.json())
        .then(res=>console.log(res))
        .then(res=>{
            const updatedUsers = users.filter((user) => user.id != id);
            setUsers(updatedUsers)
        })
        

    }

    useEffect(() => {
        fetch('http://127.0.0.1:5000//users')
        .then(response => response.json())
        .then(data => {
            setUsers(data.Data)
        })
    }, [])

  const openDeleteModal = (vid) => {
    setSelectedVideo(vid)
    const deleteModalElement = document.getElementById("deleteModal");
    const deleteModal = new window.bootstrap.Modal(deleteModalElement);
    deleteModal.show();
  };

  return (
    <>  
        <h3 className='my-4'>Users in the system</h3>
        <table class="table table-striped mx-auto">
            <thead className=''>
                <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Last sign in</th>
                    <th scope="col">Activity</th>
                    <th scope="col-span-2">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
            users.map((user)=>{
                return(
                    <tr key={user.user_id}>
                        <th scope="row align-middle" className='align-middle'>{user.user_id}</th>
                        <td class="align-middle">{user.first_name}</td>
                        <td class="align-middle">{user.last_name}</td>
                        <td class="align-middle">{user.user_email}</td>
                        <td class="align-middle">{user.user_birthdate}</td>
                        <td class="align-middle">{user.lastLogin}</td>
                        <td className='align-middle'>
                            {user.isOnline ? <span className='btn btn-success'>Online</span> : <span className='btn btn-secondary'>Offline</span>}
                        </td>
                        <td>
                        <button className='btn btn-danger d-flex flex-row align-items-center align-middle grow mb-2' onClick={()=>openDeleteModal(user.user_id)}>
                        <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                        </button>
                            <Link to={`/user/${user.user_id}/${user.first_name}/${user.last_name}/videos`} className='btn btn-primary grow'>
                                <IoEye className='fs-6' /> View videos
                            </Link>
                        </td>
                    </tr>
                )
            })
            }
            </tbody>
        </table>
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
    </>
  )
}

export default UserReview
