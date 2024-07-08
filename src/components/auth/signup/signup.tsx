import { FC } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Navbar } from "../../navbar/navbar";
import { constants } from "../../../utils/constants";
import { FormData } from "../../../types/form-data";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Signup: FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Entenr valid email")
      .required("Email is required"),
    password: yup.string().min(8).max(32).required("Password is required"),
    confrim_password: yup.string()
    .test('passwords-match', 'Passwords must match', function(value){
      return this.parent.password === value
    }),
    github_username: yup.string().required("Github username required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleSignup = (data: FormData) => {
    const formData:FormData = data;
    delete formData.confrim_password
    axios
      .post(constants.server.url + "/auth/signup", JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("++++++++", res);
        if (res.status === 200) {
          reset();
          navigate("/login", { state: { user: res.data.data } });
        }
      })
      .catch((e) => {
        console.log("=====", e);
      });
  };

  return (
    <div className="mainContainer">
      <div className="nav">
        <Navbar />
      </div>
      <div className="signupContainer">
        <div className="formContainer">
          <p className="formHeading">Signup</p>
          <form onSubmit={handleSubmit(handleSignup)}>
            <div>
              <TextField
                label="Name"
                className="fomInput"
                {...register("name")}
                error={errors.name ? true : false}
                helperText={errors?.name?.message as any}
              />
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
              <TextField
                label="Confrim Password"
                type="password"
                className="fomInput"
                {...register("confrim_password")}
                error={errors.confrim_password ? true : false}
                helperText={errors?.confrim_password?.message as any}
              />
              <TextField
                label="Github Username"
                className="fomInput"
                {...register("github_username")}
                error={errors.github_username ? true : false}
                helperText={errors?.github_username?.message as any}
              />
            </div>
            <div>
              <button
                className="signup-btn"
                type="submit"
              >
                Signup
              </button>
              <p className="signup-footer">
                Already have account? <Link to="/login">Login</Link> Here
              </p>
            </div>
          </form>
        </div>
        <div className="imagecontainer"></div>
      </div>
    </div>
  );
};
