import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

function Home() {
  const isLoggedIn = localStorage.getItem("userID");

  if (!isLoggedIn) {
    window.location.href = "/login";
  }

  return (
    <div className="homepage">
      <NavBar />
      <h1>Welcome to the homepage</h1>
    </div>
  );
}

export default Home;
