import React, { useState } from 'react';

export default function EditProfile() {

    const [formData, setformData] = useState({
        firstName:"",
        lastName:" ",
        email: "",
        password: "",
        confirmPassword: "",
        userBD:""
    })

    const [ErrorData, SetErrorData] = useState({
        name : "",
        email: "",
        password: "",
        // userBDError:"",
        // userRoleError:"user",
    })

    function handleData(event){
        const {name, value,type, files} = event.target
    
        setformData(prevFormData=>{
          return{
            ...prevFormData,
            [name] : type==="file"? files[0] : value
          }
        })
    
    }

    async function handleSubmit(event) {
        event.preventDefault()
        // request header
        let jwtToken = localStorage.getItem('jwt_token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwtToken}`);
        myHeaders.append("Cookie", `session=.${jwtToken}`);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(formData),
      };
        fetch('http://localhost:5000/edit-profile', requestOptions
      )
          .then(response =>  response.json())
          .then(res =>{if(res.isError){
    
            const dataObject = res.Data // data object of the response 
    
            const objectKeysArr = Object.keys(dataObject); // array of the data object attributes name
    
            let temp = {    
              name : "",
              email: "",
              password: "",
            //   userRoleError:"user",
          } // temp structure to set the state in one step 
    
          objectKeysArr.map(async (key)=>{ 
            if(dataObject[key].isError){
    
            temp[key] = dataObject[key].msg
    
          }
          })// end of the .map
    
          SetErrorData(temp)
        }// end of the if 
        else{
            console.log(formData)
        }// end of the else
      })
    }

    return (
        <div className='container p-0 my-5 card w-100'>

            <div className='row w-100 m-0 justify-content-center my-3'>
                <div className='col-12 d-flex justify-content-start fontw'><h2>Edit personal data</h2></div>

                <div className='col-12 d-flex justify-content-center'>
                    <img class="profileImg " src="https://www.alguardian.com/img/22/06/17/66193-16554468526337002.jpeg" />
                    </div>
            </div>
{/* 
            <div className='row justify-content-center mb-4'>
                    <div className='col-5 d-flex justify-content-center'>
                    <img class="profileImg " src="https://www.alguardian.com/img/22/06/17/66193-16554468526337002.jpeg" />
                    </div>
            </div> */}

            <div className='row w-100 m-0 justify-content-center'>
            <form className='col-12 '>

                <div className='row justify-content-center row mb-3'>
                    <label className='col-5'>First name</label>
                    <label className='col-5'>Last name</label>

                    <div className='col-5'>
                        <input className='form-control' placeholder='first name' name='firstName' value={formData.firstName} onChange={handleData}/>
                    </div>
                    <div className='col-5'>
                        <input className='form-control' placeholder='last name' name='lastName' value={formData.lastName} onChange={handleData}/>
                    </div>
                    { ErrorData.name &&
                        <div className='col-10'>
                            <p className='danger'>{ErrorData.name}</p>
                        </div>
                    }
                </div>
                
                <div className='row justify-content-center row mb-3'>
                    <label className='col-5'>Birth date</label>
                    <label className='col-5'>Last name</label>

                    <div className='col-5'>
                        <input type="date" className='form-control' name='userBD' value={formData.userBD} onChange={handleData}/>
                    </div>
                    <div className='col-5'>
                        <input type="file" className='form-control' name='profileImage' value={formData.profileImage} onChange={handleData}/>
                    </div>
                </div>

                <div className='row'>
                    <label className='col-4 offset-1'>Email</label>
                </div>

                <div className='row row mb-3'>
                    <div className='col-10 offset-1'>
                    <input className='form-control' name='email' placeholder='Email' value={formData.email} onChange={handleData}/>
                    </div>
                    { ErrorData.email &&
                    <p className='col-8 '>{ErrorData.email}</p>
                    }
                </div>

                <div className='row '>
                    <label className='col-4 offset-1'>Password</label>
                </div>

                <div className='row mb-3'>
                    <div className='col-10 offset-1'>
                    <input className='form-control' name='password' placeholder='Password' type="password" value={formData.password} onChange={handleData}/>
                    </div>
                    { ErrorData.password &&
                    <p className='col-8 '>{ErrorData.password}</p>
                    }
                </div>

                <div className='row'>
                    <label className='col-8 offset-1'>Password Confiramtion</label>
                </div>

                <div className='row row mb-3'>
                    <div className='col-10 offset-1'>
                    <input className='form-control' name='confirmPassword' type="password" placeholder='Password Confiramtion' value={formData.confirmPassword} onChange={handleData}/>
                    </div>
                    { ErrorData.confirmPassword &&
                    <p className='col-8 '>{ErrorData.confirmPassword}</p>
                    }
                </div>

                <div className='row row mb-3'>
                    <div className='col-4 offset-4'>
                        <button className='btn blackbg white py-1 form-control' onClick={handleSubmit}>submit</button>
                    </div>
                </div>


            </form>
            </div>

        </div>
    )
}
