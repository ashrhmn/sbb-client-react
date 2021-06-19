import React, { useState, useEffect } from "react";
import LoginWindow from "../components/LoginWindow";
import Dashboard from "../components/Dashboard";
import axios from "axios";

const LandingPage = () => {
  useEffect(() => {
    VerifyCurrentUser();
  });
  const LoginPrompt = () => {
    return (
      <div className="h-screen bg-gray-200 flex items-center">
        <div
          style={{ maxWidth: 400 }}
          className="mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <LoginWindow />
        </div>
      </div>
    );
  };

  const DashboardWindow = () => {
    return (
      <div className="">
        <div className="">
          <Dashboard
            currentUserUsername={loggedInUserUsername}
            currentUserId={loggedInUserId}
          />
        </div>
      </div>
    );
  };
  const [loggedIn, setloggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loggedInUserUsername, setLoggedInUserUsername] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  function VerifyCurrentUser() {
    const token = localStorage.getItem("JWToken") || "";
    axios
      .get("http://localhost:8080/currentUser", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        // console.log(response.data);
        setLoggedInUserUsername(response.data._username);
        setLoggedInUserId(response.data._id);
        setloggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        setLoggedInUserUsername(null);
        setLoggedInUserId(null);
        setloggedIn(false);
      })
      .finally(() => {
        setLoaded(true);
      });
  }
  return (
    <div className="mx-auto" style={{maxWidth:900}}>
      {loaded ? (
        <div>{loggedIn ? <DashboardWindow /> : <LoginPrompt />}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LandingPage;
