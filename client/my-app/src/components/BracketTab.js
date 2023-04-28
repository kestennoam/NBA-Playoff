// react compoennt with the following img
// <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
// <img src={logo} alt="bracket" />
// </div>

import React from "react";
import NavBar from "./NavBar";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/NBA 2023 Bracket.png";

export default function BracketTab() {
  return (
    <div className="homepage">
      <NavBar />
      //{" "}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        // <img src={logo} alt="bracket" />
        //{" "}
      </div>
    </div>
  );
}
