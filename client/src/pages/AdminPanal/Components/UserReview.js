import React, { useEffect } from 'react';

import { FaTrash } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function UserReview() {
    const id = 1

    function handleDelete(id){
        console.log(id)
        fetch('https://api.example.com/data/123', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if required
            },
        })
        .then(response => response.json())
        .then(res=>console.log(res))
    }

    useEffect(() => {
        fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => {
            const users = data.Data
            const usersArr = users.map((user)=>{
                return(
                    <tr key={user.user_id}>
                        <th scope="row align-middle" className='align-middle'>1</th>
                        <td class="align-middle">user.first_name</td>
                        <td class="align-middle">user.last_name</td>
                        <td class="align-middle">user.user_email</td>
                        <td class="align-middle">user.user_birthdate</td>
                        <td class="align-middle">user.lastLogin</td>
                        <td className='align-middle'>
                            {user.isOnline ? <span className='btn btn-success'>Online</span> : <span className='btn btn-secondary'>Offline</span>}
                        </td>
                        <td>
                        <button className='btn btn-danger d-flex flex-row align-items-center align-middle mb-2' onClick={()=>handleDelete(user.user_id)}>
                        <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                        </button>
                            <Link to={`/user/${user.user_id}/videos`} className='btn btn-primary'>
                                <IoEye className='fs-6' /> View videos
                            </Link>
                        </td>
                    </tr>
                )
            })
        })
    }, [])
    
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
                <tr>
                    <th scope="row align-middle" className='align-middle'>1</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">omarhanafy@mdo.com</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td className='align-middle'>
                        <span className='btn btn-secondary'>Offline</span>
                    </td>
                    <td>
                <button className='btn btn-danger d-flex flex-row align-items-center align-middle mb-2'>
                    <FaTrash /> <h6 className='my-auto ml-1'>Delete</h6>
                </button>
                        <Link to={`/user/${id}/videos`} className='btn btn-primary'>
                            <IoEye className='fs-6' /> View videos
                        </Link>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className='align-middle'>2</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">@mdo</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td>
                        <span className='btn btn-secondary'>Offline</span>
                    </td>
                    <td>
                        <button className='btn btn-danger'>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className='align-middle'>2</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">@mdo</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td>
                        <span className='btn btn-secondary'>Offline</span>
                    </td>
                    <td>
                        <button className='btn btn-danger'>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className='align-middle'>2</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">@mdo</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td>
                        <span className='btn btn-success'>Online</span>
                    </td>
                    <td>
                        <button className='btn btn-danger'>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className='align-middle'>2</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">@mdo</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td>
                        <span className='btn btn-success'>Online</span>
                    </td>
                    <td>
                        <button className='btn btn-danger'>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className='align-middle'>2</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">@mdo</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td>
                        <span className='btn btn-success'>Online</span>
                    </td>
                    <td>
                        <button className='btn btn-danger'>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className='align-middle'>2</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">@mdo</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td>
                        <span className='btn btn-success'>Online</span>
                    </td>
                    <td>
                        <button className='btn btn-danger'>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className='align-middle'>2</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">@mdo</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td>
                        <span className='btn btn-success'>Online</span>
                    </td>
                    <td>
                        <button className='btn btn-danger'>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" className='align-middle'>2</th>
                    <td class="align-middle">Mark</td>
                    <td class="align-middle">Otto</td>
                    <td class="align-middle">@mdo</td>
                    <td class="align-middle">12/5/2001</td>
                    <td class="align-middle">12/5/2001</td>
                    <td>
                        <span className='btn btn-success'>Online</span>
                    </td>
                    <td>
                        <button className='btn btn-danger'>
                            <FaTrash /> Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default UserReview
