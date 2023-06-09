/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./EditProfile.css";

export default function EditProfile(props) {
  const [formData, setformData] = useState({
    firstName: props.profileData.firstName,
    lastName: props.profileData.lastName,
    email: props.profileData.email,
    password: "",
    confirmPassword: "",
    userBD: props.profileData.userBD,
    profileImage: new File([],"" , { type: "application/octet-stream" }), 
  }); 

  const [ErrorData, SetErrorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // userBDError:"",
    // userRoleError:"user",
  });

  function handleData(event) {
    const { name, value, type, files } = event.target;

    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "file" ? files[0] : value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData2 = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        // Only add profileImage if it exists
        if (key !== 'profileImage' || (key === 'profileImage' && value)) {
            formData2.append(key, value);
        }
      });
    
    formData2.append("firstName", formData.firstName);
    formData2.append("lastName", formData.lastName);
    formData2.append("userBD", formData.userBD);
    formData2.append("password", formData.password);
    formData2.append("email", formData.email);
    formData2.append("confirmPassword", formData.confirmPassword);
    formData2.append("profileImage", formData.profileImage);
    // request header
    let jwtToken = localStorage.getItem("jwt_token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwtToken}`);
    myHeaders.append("Cookie", `session=.${jwtToken}`);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formData2,
    };

    fetch("http://localhost:5000/edit-profile", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.isError) {
          const dataObject = res.Data; // data object of the response
          const objectKeysArr = Object.keys(dataObject); // array of the data object attributes name
          let temp = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            // userBDError:"",
            // userRoleError:"user",
          }; // temp structure to set the state in one step
          objectKeysArr.map(async (key) => {
            if (dataObject[key].isError) {
              temp[key] = dataObject[key].msg;
            }
          }); // end of the .map
          SetErrorData(temp);
        } // end of the if
        else {
            window.location.reload();
        } // end of the else
      }).catch((error) => {
        window.location.reload();
        console.log("error", error)
      });
  }

  return (
    <div className="w-100 h-100 d-flex EditProfile ">
      <div className="container p-0 my-auto claculateHighAndWidth card w-100 py-3 shadow border py-5">
        <div className="row w-full m-0 justify-content-center my-3">
          <div className="col-12 d-flex justify-content-start fontw my-2">
            <h2 className="mx-4">Edit personal data</h2>
          </div>

          <div className="col-12 d-flex justify-content-center">
            <img class="profileImg " src={props.profileData.userImage} />
          </div>
        </div>

        <div className="row w-100 m-0 justify-content-center">
          <form className="col-12 ">
            <div className="row justify-content-center row mb-3">
              <label className="col-5">First name</label>
              <label className="col-5">Last name</label>

              <div className="col-5">
                <input
                  className="form-control"
                  placeholder="first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleData}
                />
              </div>
              <div className="col-5">
                <input
                  className="form-control"
                  placeholder="last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleData}
                />
              </div>

              <div className="col-5">
                {ErrorData.firstName && (
                  <p className="text-danger">{ErrorData.firstName}</p>
                )}
              </div>

              <div className="col-5">
                {ErrorData.lastName && (
                  <p className="text-danger">{ErrorData.lastName}</p>
                )}
              </div>
            </div>

            <div className="row justify-content-center row mb-3">
              <label className="col-5">Birth date</label>
              <label className="col-5">Personal Image</label>

              <div className="col-5">
                <input
                  type="date"
                  className="form-control"
                  name="userBD"
                  value={formData.userBD}
                  onChange={handleData}
                />
              </div>
              <div className="col-5">
                <input
                  type="file"
                  className="form-control pb-4"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  name="profileImage"
                  onChange={handleData}
                  required
                />
              </div>
            </div>

            <div className="row">
              <label className="col-4 offset-1">Email</label>
            </div>

            <div className="row row mb-3">
              <div className="col-10 offset-1">
                <input
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleData}
                />
              </div>
              {ErrorData.email && (
                <p className="col-10 offset-1 mt-1 text-danger">
                  {ErrorData.email}
                </p>
              )}
            </div>

            <div className="row ">
              <label className="col-4 offset-1">Password</label>
            </div>

            <div className="row mb-3">
              <div className="col-10 offset-1">
                <input
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleData}
                />
              </div>
              {ErrorData.password && (
                <p className="col-10 offset-1 mt-1 text-danger">
                  {ErrorData.password}
                </p>
              )}
            </div>

            <div className="row">
              <label className="col-8 offset-1"> Confirm Password </label>
            </div>

            <div className="row row mb-3">
              <div className="col-10 offset-1">
                <input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  placeholder="Password Confiramtion"
                  value={formData.confirmPassword}
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="row row mb-3">
              <div className="col-4 offset-4">
                <button
                  className="btn blackbg white py-2 mt-2 form-control"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
