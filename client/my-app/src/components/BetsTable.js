import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import BetsTableBetCell from "./BetsTableBetCell";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";

const API_URL = process.env.REACT_APP_SERVER_URL;
console.log("api url", process.env);

async function onSaveBet(userID, seriesID, betWinsFirstTeam, betWinsSecondTeam) {
  try {
    await axios.delete(`${API_URL}/bets/user/${userID}/series/${seriesID}`);
    const response = await axios.post(`${API_URL}/bets`, {
      user: userID,
      series: seriesID,
      betWinsFirstTeam,
      betWinsSecondTeam,
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

function BetsTable() {
  const isLoggedIn = localStorage.getItem("userID");

  if (!isLoggedIn) {
    window.location.href = "/login";
  }
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("url", `${API_URL}/series/round`);
      try {
        const [series, bets] = await Promise.all([
          axios.get(`${API_URL}/series/round`),
          axios.get(`${API_URL}/bets/user/${localStorage.getItem("userID")}`),
        ]);

        const data = series.data.map((s) => {
          const bet = bets.data.find((b) => b.series === s._id);
          // print date now as date
          // parse date to timestamp
          s.lastTimeForChange = new Date(s.lastTimeForChange).getTime();
          return {
            id: s._id,
            firstTeam: s.firstTeam,
            secondTeam: s.secondTeam,
            winsFirstTeam: s.winsFirstTeam,
            winsSecondTeam: s.winsSecondTeam,
            couldBeChanged: Date.now() < s.lastTimeForChange,
            betWinsFirstTeam: bet ? bet.betWinsFirstTeam : 0,
            betWinsSecondTeam: bet ? bet.betWinsSecondTeam : 0,
            lastTimeForChange: s.lastTimeForChange,
          };
        });

        setData(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <NavBar />
      <Box sx={{ mx: "auto", my: 4, maxWidth: 800 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Home Team</TableCell>
                <TableCell align="right">Away Team</TableCell>
                <TableCell align="right">Current Result</TableCell>
                <TableCell align="right">Your Bet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.firstTeam}
                  </TableCell>
                  <TableCell align="right">{row.secondTeam}</TableCell>
                  <TableCell align="right">
                    {row.winsFirstTeam}-{row.winsSecondTeam}
                  </TableCell>
                  <TableCell align="right">
                    <BetsTableBetCell
                      userID={localStorage.getItem("userID")}
                      onSaveBet={onSaveBet}
                      homeTeam={row.firstTeam}
                      awayTeam={row.secondTeam}
                      seriesID={row.id}
                      betWinsFirstTeam={row.betWinsFirstTeam}
                      betWinsSecondTeam={row.betWinsSecondTeam}
                      couldBeChanged={row.couldBeChanged}
                      lastTimeForChange={row.lastTimeForChange}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default BetsTable;
