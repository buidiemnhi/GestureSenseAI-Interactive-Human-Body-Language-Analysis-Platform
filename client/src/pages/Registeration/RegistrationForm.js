import { useState } from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

export default function RegistrationForm() {

  let navigate = useNavigate();
  // state for the form data
  const [formData, setformData] = useState({
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    userBD:""
  })
  
  // style for the second column background image
  // const style ={
  //   backgroundImage: `url(${img})`,
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat"
  // }
  
  // state for the form data errors
  const [ErrorData, SetErrorData] = useState({
    name : "",
    email: "",
    password: "",
    // userBDError:"",
    userRoleError:"user",
  })

  //Ad any input data into one object
  function handleData(event){
    const {name, value,type, files} = event.target

    setformData(prevFormData=>{
      return{
        ...prevFormData,
        [name] : type==="file"? files[0] : value
      }
    })

    
  }

  //Handel submiting of the data
  async function handleSubmit(event) {
    event.preventDefault()
    fetch('http://127.0.0.1:5000//register', {method: "POST", headers: {
      
      'Content-Type': 'application/json' 
    },body: JSON.stringify(formData)
  })
      .then(response => response.json())
      .then(res =>{ if(res.isError){

        const dataObject = res.Data // data object of the response 

        const objectKeysArr = Object.keys(dataObject); // array of the data object attributes name

        let temp = {    
          name : "",
          email: "",
          password: "",
          userRoleError:"user",
      } // temp structure to set the state in one step 

      objectKeysArr.map(async (key)=>{ 
        if(dataObject[key].isError){

        temp[key] = dataObject[key].msg

      }
      })// end of the .map

      SetErrorData(temp)
    }// end of the if 
    else{
      navigate('/signin');
    }// end of the else
  })
}// end of the async function

  return (
    <div className="py-5">
    <div className="container">
      <div className="row shadow bg-light">
        <div className="col-md-7">
          <div className="row mb-5 mt-5 justify-content-center">
            <h3 className="display-3"> Logo </h3>
          </div>
          <form id="c_form-h" className="" noValidate>
          <div className="form-group row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group row"><label className="col-form-label col-8" >First name</label>
                      <div className="col-12" ><input type="text" className="form-control" placeholder="First name" name='firstName' value={formData.firstName} onChange={handleData} required="required"/></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group row"><label className="col-form-label col-8" >Second name</label>
                      <div className="col-12" ><input type="text" className="form-control"  placeholder="Second name" name='lastName' value={formData.lastName} onChange={handleData} required/></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-12">
                <div className="row">
                  { ErrorData.name &&
                  <div className="col-12">
                    <p className="text-danger"> {ErrorData.name} </p>
                  </div>
                  }
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group row"><label className="col-form-label col-8">Profile picture</label>
                      <div className="col-12" >
                        <input type="file" className="form-control pb-4"  aria-describedby="inputGroupFileAddon04" aria-label="Upload" name='profileImage' onChange={handleData} required/>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group row"><label className="col-form-label col-8">Birth date</label>
                      <div className="col-12" ><input type="date" className="form-control"  value={formData.userBD} name='userBD' onChange={handleData} required/></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group row"> 
            <label htmlFor="inputmailh" className="col-form-label col-4 offset-1">E-mail</label>
              <div className="col-10 offset-1 align-self-center" >
                <input type="email" className="form-control" placeholder="mail@example.com" name='email' value={formData.email} onChange={handleData}  required/> </div>
            </div>
            { 
            <div className="form-group row">
              <div className="col-10 offset-1">
                <p className="text-danger"> {ErrorData.email} </p>
              </div>
            </div>
            }
            <div className="form-group row"> <label htmlFor="inputpasswordh" className="col-form-label col-3 offset-1">Password</label>
              <div className="col-10 align-self-center offset-1">
                <input type="password" className="form-control" placeholder="Password" value={formData.password} name="password" onChange={handleData} required/> </div>
            </div>
            <div className="form-group row">
              <div className="col-10 offset-1">
                <p className="text-danger">{ErrorData.password}</p>
              </div>
            </div>
            <div className="form-group row"> <label htmlFor="inputpasswordh" className="col-form-label col-5 offset-1">Confirm Password</label>
              <div className="col-10 offset-1 align-self-center">
                <input type="password" className="form-control" placeholder="Confirm Password" value={formData.confirmPassword} name='confirmPassword' onChange={handleData} required/> </div>
            </div>
            {
            <div className="form-group row">
              <div className="col-10 offset-1">
                <p className="text-danger"> {ErrorData.password}</p>
              </div>
            </div>
            }
            <div className="justify-content-center form-group row mb-3">
              <button onClick={handleSubmit} className="btn btn-primary btn-lg btn-block offset-md-2 form-row col-4 col-md-8">Sign up</button>
            </div>
            <div className="row justify-content-center mb-3">
              <h6 className="display-6"> Already have an account? <Link to="/login" >Sign in</Link> </h6>
            </div>
            
          </form>
        </div>
        <div class="col-md-6" ></div>
      </div>
    </div>
  </div>
  )
}