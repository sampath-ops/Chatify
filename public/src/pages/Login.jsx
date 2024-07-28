import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { mobile } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    console.log("current user", process.env.REACT_APP_LOCALHOST_KEY);
    setValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("UserName and Password should not be empty", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("UserName and Password should not be empty", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Chatify</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default Login;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  ${mobile(css`
    width: 100%;
    padding: 1rem;
  `)}
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
    ${mobile(css`
      img {
        height: 3rem;
      }
      h1 {
        font-size: 24px;
      }
    `)}
  }

  form {
    display: flex;
    width: 500px;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    ${mobile(css`
      padding: 1.5rem;
      width: 100%;
    `)}
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #c822ff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #e6abff;
      outline: none;
    }
    ${mobile(css`
      padding: 0.8rem;
    `)}
  }
  button {
    background-color: #c822ff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      outline: 2px solid #e6abff;
    }
    ${mobile(css`
      padding: 0.8rem;
    `)}
  }
  span {
    color: white;
    text-transform: uppercase;
    font-size: 14px;
    text-align: center;
    a {
      color: #c822ff;
      text-decoration: none;
      font-weight: bold;
    }
    ${mobile(css`
      line-height: 28px;
    `)}
`;
