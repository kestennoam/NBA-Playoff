import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

// function to get a bet if exists by user id and series id

async function genBetByUserAndSeriesId(userId, seriesId) {
  try {
    console.log("userId:", userId);
    console.log("seriesId:", seriesId);
    const res = await axios.get(`http://localhost:3001/bets/user/${userId}/series/${seriesId}`);
    console.log("noam", res.data);
    if (res.data !== null) {
      return `${res.data.betWinsFirstTeam}-${res.data.betWinsSecondTeam}`;
    } else {
      return "0-0";
    }
  } catch (error) {
    // return a button to add a bet
    console.error(error);
    return "0-0";
  }
}

export default function BetsTable() {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/series/round")
      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [betData, setBetData] = useState({});

  useEffect(() => {
    async function getBetData() {
      const betDataPromises = series.map(async (row) => {
        console.log("row", row);
        const bet = await genBetByUserAndSeriesId("6437318621bd54afa11cc52f", row._id);
        return {
          seriesId: row.id,
          bet: bet,
        };
      });
      const betDataArray = await Promise.all(betDataPromises);
      const betDataObject = {};
      betDataArray.forEach((item) => {
        betDataObject[item.seriesId] = item.bet;
      });
      setBetData(betDataObject);
    }
    getBetData();
  }, [series]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Home Team</TableCell>
            <TableCell align="right">Away Team</TableCell>
            <TableCell align="right">Bet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {series.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.firstTeam}
              </TableCell>
              <TableCell align="right">{row.secondTeam}</TableCell>
              <TableCell align="right">{betData[row.id] || "Place Bet"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
