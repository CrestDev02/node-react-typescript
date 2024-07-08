import { FC, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Navbar } from "../../navbar/navbar";
import { LoginFormData } from "../../../types/form-data";
import { constants } from "../../../utils/constants";
import axios from "axios";
import {  Notification } from "../../common/banner";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login: FC = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Entenr valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  
  const [response, setResponse] = useState({ isError: false, message: "" });

  const handleLogin = (data:LoginFormData) => {
    axios
      .post(constants.server.url + "/auth/login", data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          reset();
          navigate("/", { state: { loginSuccess: true } });
        }
        console.log("--------", res);
      })
      .catch((e) => {
        console.log("!!!!!!!", e);
        setResponse({ isError: true, message: e.response.data.message });
      });
  };

  return (
    <div className="mainContainer">
      <div className="nav">
        <Navbar />
      </div>
      <div className="loginContainer">
        <div className="formContainer">
          <p className="formHeading">Login</p>
          <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <TextField
              label="Email"
              className="fomInput"
              {...register("email")}
                error={errors.email ? true : false}
                helperText={errors?.email?.message as any}
            />
            <TextField
              label="Password"
              type="password"
              className="fomInput"
              {...register("password")}
                error={errors.password ? true : false}
                helperText={errors?.password?.message as any}
            />
          </div>
          <div>
            <button
              className="login-btn"
              type="submit"
            >
              Login
            </button>
            <p className="login-footer">
              Not Registered yet. <Link to="/signup">Register</Link> Here
            </p>
          </div>
          </form>
        </div>
        <div className="imagecontainer"></div>
      </div>
      <Notification
        open={response.isError}
        message={response.message}
        handleClose={() => setResponse({ isError: false, message: "" })}
        status="error"
      />
    </div>
  );
};
