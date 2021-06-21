import React from "react";
import { useQuery } from "react-query";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Customers from "../views/Customers";
import Items from "../views/Items";
import NewEntry from "../views/NewEntry";
import * as ItemsApi from '../api/ItemsApi'

const Dashboard = (props) => {
  const { data: itemData } = useQuery("items", ItemsApi.getItems);
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
      <div>
        <Router>
          <div>
            <nav className="bg-blue-300 p-8">
              <ul className="flex space-x-2 text-xl">
                <li>
                  <Link to="/">Customers</Link>
                </li>
                <li>
                  <Link to="/items">Items</Link>
                </li>
                <li>
                  <Link to="/newEntry">NewEntry</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/newEntry">
                <NewEntry itemData={itemData} />
              </Route>
              <Route path="/items">
                <Items itemData={itemData} />
              </Route>
              <Route path="/">
                <Customers />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default Dashboard;
