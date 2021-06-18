import React, { useState } from "react";
import axios from "axios";

const LoginWindow = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [loginBtnText, setloginBtnText] = useState("Login");
  function handleLogin(e) {
    e.preventDefault();
    setloginBtnText("Logging in...");
    const loginData = { username, password };
    axios
      .post("http://localhost:8080/login", loginData)
      .then((reponse) => {
        setloginBtnText("Logged in...");
        console.log(reponse.data);
        seterrorMessage("");
        localStorage.setItem("JWToken", reponse.data);
        window.location.reload();
      })
      .catch((err) => {
        setloginBtnText("Login");
        console.log(err);
        seterrorMessage("Invalid username or password");
        localStorage.removeItem("JWToken");
      });
  }
  return (
    <div>
      <form className="flex flex-col items-center space-y-4" action="submit">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="username">
            Username
          </label>
          <input
            className="w-60 text-xl bg-gray-100 p-1 focus:bg-white rounded-sm"
            type="text"
            name="username"
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="w-60 text-xl bg-gray-100 p-1 focus:bg-white rounded-sm"
            type="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <p className="text-red-800">{errorMessage}</p>
        <button
          className="bg-blue-600 text-xl text-white w-32 rounded hover:bg-blue-900 focus:outline-none"
          onClick={handleLogin}
        >
          {loginBtnText}
        </button>
      </form>
    </div>
  );
};

export default LoginWindow;
