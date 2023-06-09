import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  let navigate = useNavigate();
  // state for the form data
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: new File([], "", { type: "application/octet-stream" }),
    userBD: "",
  });

  // state for the form data errors
  const [ErrorData, SetErrorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Birthdate: "",
  });

  //Ad any input data into one object
  function handleData(event) {
    const { name, value, type, files } = event.target;

    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "file" ? files[0] : value,
      };
    });
  }

  const today = new Date();
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
  // Format the date to match the required format (yyyy-mm-dd) for input type date
  const maxDate = eighteenYearsAgo.toISOString().split("T")[0];

  //Handel submiting of the data
  async function handleSubmit(event) {
    event.preventDefault();

    const formData2 = new FormData();
    formData2.append("firstName", formData.firstName);
    formData2.append("lastName", formData.lastName);
    formData2.append("userBD", formData.userBD);
    formData2.append("password", formData.password);
    formData2.append("email", formData.email);
    formData2.append("confirmPassword", formData.confirmPassword);
    formData2.append("profileImage", formData.profileImage);
    formData2.append("isAdmin", 1);
    console.log(formData2.getAll("password"));

    for (let [key, value] of formData2.entries()) {
      console.log(key, value);
    }

    fetch("http://127.0.0.1:5000//register", {
      method: "POST",
      body: formData2,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
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
            Birthdate: "",
          }; // temp structure to set the state in one step

          objectKeysArr.map(async (key) => {
            if (dataObject[key].isError) {
              temp[key] = dataObject[key].msg;
            }
          }); // end of the .map

          SetErrorData(temp);
        } // end of the if
        else {
          navigate("/adminpanel");
        } // end of the else
      });
  } // end of the async function

  return (
    <div className="">
      <div className="py-5">
        <div className="container ">
          <div className="row shadow py-3 col-md-10 mx-auto">
            <div className="col-md-10 mx-auto">
              <div className="row mb-4 mt-5 justify-content-center">
                <h1 className="display no-color"> Create a new admin </h1>
              </div>
              <form id="c_form-h" className="" noValidate>
                <div className="row my-1">
                  <div className="col-md-12">
                    <div className="row my-1">
                      <div className="col-6">
                        <div className="row my-1">
                          <label className="col-form-label col-10">
                            First name
                          </label>
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First name"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleData}
                              required="required"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row my-1">
                          <label className="col-form-label col-10">
                            Second name
                          </label>
                          <div className="col-12">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Second name"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleData}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-1">
                  {ErrorData.firstName && (
                    <div className="col-6">
                      <p className="text-danger"> {ErrorData.firstName} </p>
                    </div>
                  )}
                  {ErrorData.lastName && (
                    <div className="col-6">
                      <p className="text-danger"> {ErrorData.lastName} </p>
                    </div>
                  )}
                </div>
                <div className="row my-1 mb-3">
                  <div className="col-md-12">
                    <div className="row ">
                      <div className="col-6">
                        <div className="row ">
                          <label className="col-form-label col-10">
                            Profile picture
                          </label>
                          <div className="col-12">
                            <input
                              type="file"
                              className="form-control pb-4"
                              aria-describedby="inputGroupFileAddon04"
                              aria-label="Upload"
                              name="profileImage"
                              onChange={handleData}
                              accept="image/*"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row ">
                          <label className="col-form-label col-8">
                            Birth date
                          </label>
                          <div className="col-12">
                            <input
                              type="date"
                              className="form-control"
                              value={formData.userBD}
                              max={maxDate} // set the max date to be 18 years ago
                              name="userBD"
                              onChange={handleData}
                              required
                            />
                          </div>
                          <div className="col-12 ">
                            <p className="text-danger">
                              {" "}
                              {ErrorData.Birthdate}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-1">
                  <label htmlFor="inputmailh" className="col-form-label col-4 ">
                    E-mail
                  </label>
                  <div className="col-12  align-self-center">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="mail@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleData}
                      required
                    />{" "}
                  </div>
                </div>
                {
                  <div className="row my-1">
                    <div className="col-12 ">
                      <p className="text-danger"> {ErrorData.email} </p>
                    </div>
                  </div>
                }
                <div className="row my-1">
                  {" "}
                  <label
                    htmlFor="inputpasswordh"
                    className="col-form-label col-3"
                  >
                    Password
                  </label>
                  <div className="col-12 align-self-center">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      name="password"
                      onChange={handleData}
                      required
                    />{" "}
                  </div>
                </div>
                <div className="row my-1">
                  <div className="col-12 ">
                    <p className="text-danger">{ErrorData.password}</p>
                  </div>
                </div>
                <div className="row my-1">
                  {" "}
                  <label
                    htmlFor="inputpasswordh"
                    className="col-form-label col-5"
                  >
                    Confirm Password
                  </label>
                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      name="confirmPassword"
                      onChange={handleData}
                      required
                    />{" "}
                  </div>
                </div>
                {
                  <div className="row my-1">
                    <div className="col-12">
                      <p className="text-danger"> {ErrorData.password}</p>
                    </div>
                  </div>
                }
                <div className="justify-content-center row mb-3">
                  <button
                    onClick={handleSubmit}
                    className="btn blackbg white btn-lg btn-block offset-md-2 form-row col-4 col-md-8 grow"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
