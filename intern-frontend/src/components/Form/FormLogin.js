import React, { useState, useEffect } from "react";
import classes from "./FormLogin.module.css";
import { checkLogin, setItem } from "../../services/getList";
import axios from "axios";

const FormLogin = () => {
  const [inputField, setInputField] = useState({
    email: "",

    password: "",
  });

  const [errorField, setErrorField] = useState({
    emailErr: "",

    passwordErr: "",
  });

  const inputHandler = (event) => {
    setInputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validForm(inputField)) {
      const user = {
        email: inputField.email,

        password: inputField.password,
      };

      try {
       const response =  await checkLogin(inputField);
       console.log(response.message)
       if(response.data.token){
          localStorage.setItem('token',response.data.token)
          window.location.href = '/dashboard'
       }else {
        alert("Check email and password")
       }
      } catch (e) {
        return e;
      }
    } else {
      console.log("invalid");
    }
  };

  const validForm = (inputField) => {
    let formIsValid = true;

    const validEmailRegex = RegExp(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    setErrorField({
      emailErr: "",

      passwordErr: "",
    });

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

    if (inputField.password === "") {
      formIsValid = false;
      setErrorField((prevState) => ({
        ...prevState,
        passwordErr: "Please enter valid password",
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
