import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import BetsTable from "./components/BetsTable";
import BracketTab from "./components/BracketTab";

function App() {
  // process.env.REACT_APP_SERVER_URL = "http://127.0.0.1:3001";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/bets" element={<BetsTable />} />
        <Route path="/bracket" element={<BracketTab />} />
      </Routes>
    </Router>
  );
}

export default App;
