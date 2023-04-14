import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  const isLoggedIn = localStorage.getItem("userID");

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <h1>Please login to continue</h1>
        <NavLink to="/login" activeClassName="active">
          Login
        </NavLink>
      </div>
    );
  }

  return (
    <div className="homepage">
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" activeClassName="active">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1>Welcome to My React App</h1>
      <p>Here is some example text for the homepage of your React application.</p>
    </div>
  );
}

export default Home;
