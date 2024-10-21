/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string>("");
    
    //const { login } = useAuth();
    const navigate = useNavigate();

  // async function handleSubmit() {
  //   if (userName === "" || password === "") {
  //     setError("Please fill all the fields");
  //   }
  //   try {
  //     const data = {
  //       userName: userName,
  //       password: password,
  //     };

  //     const response = await axios.post(
  //       "http://localhost:8080/auth/login",
  //       data
  //     );
  //       login(response.data);
  //       navigate("/");
  //   } catch (error) {
  //     setError("Your username or password is incorrect");
  //   }
  // }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-lg w-1/3 shadow-violet-500 border  shadow-2xl border-gray-200">
        <h1 className="text-2xl font-bold mb-5">Login</h1>
        <form>
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
            type="button"
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
