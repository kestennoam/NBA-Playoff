import React from "react";

export default function renderBetIsNotEdited(props) {
  const { team1Wins, team2Wins } = props;
  // return the bet if one of them is 4 otherwise "missed bet"
  console.log("team1Wins", team1Wins);
  console.log("team2Wins", team2Wins);

  return (
    <div>
      {team1Wins === 4 || team2Wins === 4 ? (
        <p>
          {team1Wins} - {team2Wins}
        </p>
      ) : (
        <p>Missed bet</p>
      )}
    </div>
  );
}
