import { useState } from 'react';

import { useSignIn } from 'react-auth-kit';
import {
  Link,
  useNavigate
} from 'react-router-dom';

export default function LoginForm() {
  // state for the form data
  const [formData, setformData] = useState({
    email: "",
    password: "",
  })

  let navigate = useNavigate(); // variable that carrys navigation function
  const signIn = useSignIn() // variable that carrys signin function

  // state for the form data errors
  const [ErrorData, SetErrorData] = useState({
    data: {
      email: {
        errorMsg: ""
        },
      password :{
        errorMsg: ""
        }
    }
  })

  // style for the second column background image
  // const style ={
  //   backgroundImage: `url(${img})`,
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat"
  // }

  // function to handle the state changes
  function handleData(event){
    const {name, value} = event.target
    setformData(prevFormData=>{
      return{
        ...prevFormData,
        [name]: value
      }

    })
  }

  // function to handle submiting of the data
  function handleSubmit(event) {
    event.preventDefault()
    fetch('http://127.0.0.1:5000//login', {method: "POST",
    headers: {
      'Content-Type': 
      'application/json;charset=utf-8'
    }
    ,body:JSON.stringify(formData)
  })
      .then(response => response.json())
      .then(res => {if(res.isError){
        console.log(res.Data)

        const dataObject = res.Data // data object of the response

        const dataObjectKeyArr = Object.keys(res.Data); // array of the data object attributes names

        var temp = {
          data: {
            email: {
              errorMsg: ""
              },
            password :{
              errorMsg: ""
              }
          }
        } // temp structure to set the state in one step 

        dataObjectKeyArr.map(async (key)=> {

          if(dataObject[key].isError){
            temp.data[key].errorMsg = dataObject[key].msg
          }
          
        }) // end of the .map
        SetErrorData(temp)
      }// end of the if

      else{ if(signIn({ token: res.jwt,
      expiresIn: 5,
      tokenType: "Bearer",
      authState: formData,
      }// end of sign in parameters
      ) // end of sign in 
      ) // end of if condition
    
      {
        localStorage.setItem('jwt_token',res.jwt);
        navigate('/Profilepage')
      } // end of if
    } // end of the else

      })
  } // end of the async function

 return (

  <div className="py-5" >
  <div className="container bg-light">
    <div className="row shadow">
      <div className="col-md-5">
        <div className="row mb-5 mt-5 justify-content-center">
          <h3 className="display-3"> Logo </h3>
        </div>
        <form id="c_form-h" className="">
          <div className="form-group row"> <label htmlFor="inputmailh" className="col-3 col-form-label offset-1">E-mail</label>
            <div className="col-10 col-sm-10 align-self-center offset-1">
              <input type="email" className="form-control" id="inputmailh" required placeholder="mail@example.com" value={formData.email} name='email' onChange={handleData} /> </div>
          </div>
          <div className="form-group row">
            {
              ErrorData.data.email.errorMsg &&
              <div className="col-10 offset-1 col-sm-10">
              <p className="text-danger"> {ErrorData.data.email.errorMsg} </p>
              </div>
            }
          </div>
          <div className="form-group row"> <label htmlFor="inputpasswordh" className="col-3 col-form-label offset-1">Password</label>
            <div className="col-10 col-sm-10 align-self-center offset-1">
              <input type="password" className="form-control" id="inputpasswordh" placeholder="Password" value={formData.password} name='password' onChange={handleData} required/> </div>
          </div>
          <div className="form-group row">
            {
              ErrorData.data.password.errorMsg && 
              <div className="col-10 offset-1 col-sm-10">
              <p className="text-danger"> {ErrorData.data.password.errorMsg}  </p>
              </div>
            }
          </div>
          <div className="justify-content-center form-group row mb-3">
            <button onClick={handleSubmit} className="btn btn-primary btn-lg btn-block offset-md-2 form-row col-4 col-md-8">Sign in</button>
          </div>
          <div className="row justify-content-center mb-3">
            <h6 className="display-6"> Don't have an account? <Link to="/signup" >Sign up</Link> </h6>
          </div>
        </form>
      </div>
      <div className="col-md-7" >
      </div>
    </div>
  </div>
</div>
  )
}