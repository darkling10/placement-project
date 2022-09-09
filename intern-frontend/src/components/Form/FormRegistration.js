import React, { useState, useEffect } from "react";
import classes from "./FormRegistration.module.css";
import { setItem } from "../../services/getList";
import axios from "axios";

const FormLogin = () => {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  

  const [errorField, setErrorField] = useState({
    nameErr: "",
    emailErr: "",
    phoneErr: "",
    passwordErr: "",
    cpasswordErr: "",
  });
  

  const inputHandler = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validForm(inputField)) {

      const user = {
        name:inputField.name,
        email:inputField.email,
        phone:inputField.phone,
        password:inputField.password
      }
      
      try {
       const data = await setItem(user)
       console.log(data)
      } catch (e) {
        return e;
      }
    } else {
      console.log("invalid")
    }
  };



  const validForm = (inputField) => {
    let formIsValid = true;

    const validEmailRegex = RegExp(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    setErrorField({
      nameErr: "",
      emailErr: "",
      phoneErr: "",
      passwordErr: "",
      cpasswordErr: "",
    });

    if (inputField.name === "") {
      formIsValid = false;
      setErrorField((prevState) => ({
        ...prevState,
        nameErr: "Please enter valid name",
      }));
    }

    if (inputField.email === "") {
      formIsValid = false;
      setErrorField((prevState) => ({
        ...prevState,
        emailErr: "Please enter valid email",
      }));
    }

    if (inputField.email !== "" && !validEmailRegex.test(inputField.email)) {
      formIsValid = false;
      setErrorField((prevState) => ({
        ...prevState,
        emailErr: "Email is not valid",
      }));
    }

    if (inputField.phone === "") {
      formIsValid = false;
      setErrorField((prevState) => ({
        ...prevState,
        phoneErr: "Please enter valid phone number",
      }));
    }

    if (inputField.password === "") {
      formIsValid = false;
      setErrorField((prevState) => ({
        ...prevState,
        passwordErr: "Please enter valid password",
      }));
    }

    if (inputField.cpassword === "") {
      formIsValid = false;
      setErrorField((prevState) => ({
        ...prevState,
        cpasswordErr: "Please enter valid password",
      }));
    }

    if (
      inputField.cpassword !== "" &&
      inputField.password !== inputField.cpassword
    ) {
      formIsValid = false;
      setErrorField((prevState) => ({
        ...prevState,
        cpasswordErr: "Password does not match",
      }));
    }

    return formIsValid;
  };

  return (
    <>
    

      <form className="form-control row" method="post" action="/login-user">
        <div style={{ margin: "auto", width: "60%" }}>
          <div className="form-group row">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={inputField.email}
              onChange={inputHandler}
              autoComplete="off"
            />
            {errorField.emailErr.length > 0 && (
              <span className={classes.error}>{errorField.emailErr}</span>
            )}
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={inputField.name}
              onChange={inputHandler}
            />
            {errorField.nameErr.length > 0 && (
              <span className={classes.error}>{errorField.nameErr}</span>
            )}
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              id="phone"
              placeholder="Enter Phone Number"
              value={inputField.phone}
              onChange={inputHandler}
            />
            {errorField.phoneErr.length > 0 && (
              <span className={classes.error}>{errorField.phoneErr}</span>
            )}
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Enter Confirm Password"
              value={inputField.password}
              onChange={inputHandler}
            />
            {errorField.passwordErr.length > 0 && (
              <span className={classes.error}>{errorField.passwordErr}</span>
            )}
          </div>
          <br></br>
          <div className="form-group row">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="cpassword"
              name="cpassword"
              className="form-control"
              id="cpassword"
              placeholder="Enter Confirm Password"
              value={inputField.cpassword}
              onChange={inputHandler}
            />
            {errorField.cpasswordErr.length > 0 && (
              <span className={classes.error}>{errorField.cpasswordErr}</span>
            )}
          </div>

          <br></br>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FormLogin;
