import React from "react";
import BetIsNotEdited from "./BetIsNotEdited";

function Bet(props) {
  const { userID, seriesID, betWinsFirstTeam, betWinsSecondTeam, onSaveBet, homeTeam, awayTeam, couldBeChanged } =
    props;
  const [showBetButton, setShowBetButton] = React.useState(false);
  const [team1Wins, setTeam1Wins] = React.useState(betWinsFirstTeam);
  const [team2Wins, setTeam2Wins] = React.useState(betWinsSecondTeam);
  const [editingResult, setEditingResult] = React.useState(false);
  const [isValid, setIsValid] = React.useState(true);
  const [initialTeam1Wins, setInitialTeam1Wins] = React.useState(betWinsFirstTeam);
  const [initialTeam2Wins, setInitialTeam2Wins] = React.useState(betWinsSecondTeam);

  React.useEffect(() => {
    if (team1Wins === 4 || team2Wins === 4) {
      setShowBetButton(false);
    } else {
      setShowBetButton(true);
    }
  }, [team1Wins, team2Wins]);

  function handleEditClick() {
    setInitialTeam1Wins(team1Wins);
    setInitialTeam2Wins(team2Wins);
    setEditingResult(true);
  }

  function handleSaveClick() {
    if ((team1Wins === 4 && team2Wins < 4) || (team2Wins === 4 && team1Wins < 4)) {
      setIsValid(true);
      setEditingResult(false);
      onSaveBet(userID, seriesID, team1Wins, team2Wins);
    } else {
      setIsValid(false);
    }
  }

  function handleCancelClick() {
    setTeam1Wins(initialTeam1Wins);
    setTeam2Wins(initialTeam2Wins);
    setEditingResult(false);
  }

  function onMakeBetClick() {
    setEditingResult(true);
  }

  function renderBetIsEdited() {
    return (
      <div>
        {editingResult ? (
          <div>
            <label htmlFor="team1Wins">{homeTeam}:</label>
            <input
              type="number"
              id="team1Wins"
              value={team1Wins}
              onChange={(e) => setTeam1Wins(parseInt(e.target.value))}
            />
            <br />
            <label htmlFor="team2Wins">{awayTeam}:</label>
            <input
              type="number"
              id="team2Wins"
              value={team2Wins}
              onChange={(e) => setTeam2Wins(parseInt(e.target.value))}
            />
            <br />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>

            {!isValid && <p>One of the teams must be with 4 points</p>}
          </div>
        ) : (
          <div>
            {team1Wins === 4 || team2Wins === 4 ? (
              <div>
                <p>
                  {team1Wins} - {team2Wins}
                </p>
                <button onClick={handleEditClick}>Edit Result</button>
              </div>
            ) : (
              <button onClick={onMakeBetClick} disabled={!showBetButton}>
                Make a bet
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  console.log("couldBeChanged", couldBeChanged);
  return couldBeChanged ? renderBetIsEdited() : <BetIsNotEdited team1Wins={team1Wins} team2Wins={team2Wins} />;
}

export default Bet;
