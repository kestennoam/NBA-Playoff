import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
// import react
import React from "react";

const API_URL = process.env.REACT_APP_SERVER_URL;

function UserBetsTable() {
  const [series, setSeries] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersResponse, seriesResponse, betsResponse] = await Promise.all([
          axios.get(`${API_URL}/users`),
          axios.get(`${API_URL}/series/round`),
          axios.get(`${API_URL}/bets`),
        ]);

        const users = usersResponse.data;
        const series = seriesResponse.data;
        const bets = betsResponse.data;

        const userBets = users.map((user) => ({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          bets: bets.filter((bet) => bet.user === user._id),
        }));

        setSeries(series);
        setData(userBets);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Box>
        <Table aria-label="simple table" sx={{ border: "1px solid rgba(224, 224, 224, 1)", padding: "16px" }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)", fontWeight: "bold", padding: "16px" }}>
                <Typography variant="h6">User</Typography>
              </TableCell>
              {series.map((series) => (
                <React.Fragment key={series._id}>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)", padding: "16px", fontWeight: "bold" }}
                  >
                    <Typography variant="h7">
                      {series.firstTeam} - {series.secondTeam}
                    </Typography>
                  </TableCell>
                  {series !== series[series.length - 1] && <TableCell sx={{ border: "none" }} />}
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)", padding: "16px" }}
                >
                  {`${user.firstName} ${user.lastName}`}
                </TableCell>
                {series.map((series) => {
                  const bet = user.bets.find((bet) => bet.series === series._id);
                  return (
                    <React.Fragment key={series._id}>
                      <TableCell
                        align="center"
                        sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)", padding: "16px" }}
                      >
                        {bet ? bet.betWinsFirstTeam : "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)", padding: "16px" }}
                      >
                        {bet ? bet.betWinsSecondTeam : "-"}
                      </TableCell>
                      {series !== series[series.length - 1] && <TableCell sx={{ border: "none" }} />}
                    </React.Fragment>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default UserBetsTable;
