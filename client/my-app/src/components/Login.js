import * as React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import NavBar from "./NavBar";

export default function Login() {
  return (
    <>
      <NavBar />
      {/* <SignIn /> */}
      <SignUp />
    </>
  );
}
