import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavBar = () => {
  const isLoggedin = localStorage.getItem("userID");
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bet31NBA
        </Typography>
        {isLoggedin ? (
          <>
            <Button href="/" color="inherit">
              Home
            </Button>
            <Button href="/bets" color="inherit">
              Bets
            </Button>
            <Button href="/leaderboard" color="inherit">
              Leaderboard
            </Button>
          </>
        ) : (
          <Button color="inherit" href="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
