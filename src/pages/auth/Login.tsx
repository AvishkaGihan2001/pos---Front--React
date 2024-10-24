/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function login() {

  const { login } = useAuth();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string>("");
    
    //const { login } = useAuth();
    const navigate = useNavigate();

 async function submit(event: any) {
    event.preventDefault();
    
    if (userName === "" || password === "") {
      setError("Please enter username and password");
      return;
    }

    const data = {
      username: userName,
      password: password,
    }

   try {
     const response = await axios.post("http://localhost:8080/auth/login", data);
     login(response.data);
     alert("Login Success");
     navigate("/");
   } catch (error) {
     setError("Invalid username or password");
   }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-lg w-1/3 shadow-violet-500 border  shadow-2xl border-gray-200">
        <h1 className="text-2xl font-bold mb-5">Login</h1>
        <form onSubmit={submit}>
          <div className="mb-5">
            <label htmlFor="userName" className="block mb-2">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter User Name"
              onChange={function (event) {
                setUserName(event.target.value);
                setError("");
              }}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter Password"
              onChange={function (event) {
                setPassword(event.target.value);
                setError("");
              }}
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-violet-500 text-white p-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
  }
  

export default login;
