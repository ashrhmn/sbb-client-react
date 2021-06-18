import React from "react";

const Dashboard = (props) => {
  function handleLogout() {
    localStorage.removeItem("JWToken");
    window.location.reload();
  }
  return (
    <div>
      <nav className="flex space-x-3 justify-end p-3">
        <div>{props.currentUserUsername}</div>
        <button
          className="bg-red-700 text-white rounded-md p-1 text-sm focus:outline-none"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
