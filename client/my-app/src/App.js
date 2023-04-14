import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import BetsTable from "./components/BetsTable";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const userId = localStorage.getItem("userID");
    if (userId) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* If the user is not logged in, render the login page */}
        {!loggedIn ? <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} /> : null}

        {/* If the user is logged in, render the homepage */}
        {loggedIn ? <Route path="/" element={<Home />} /> : null}

        {/* Render other pages that require authentication */}
        {loggedIn ? (
          <>
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/bets" element={<BetsTable />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
