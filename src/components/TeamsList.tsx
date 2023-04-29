import {
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addPokemon } from "../slices/teamCrudSlice";
import Team from "./Team";
const teamStyle = {
  display: "flex",
  flexDirection: "row",

  justifyContent: "space-around",
};

function TeamsList({ loading, savedTeams }) {
  const dispatch = useDispatch();

  if (loading) {
    // Show loading spinner or message while data is being fetched
    return (
      <>
        <div class="wrapper">
          <div class="pokeball" />
        </div>
      </>
    );
  }
  if (savedTeams.length < 1) {
    return (
      <div>
        <h1>No Teams Saved Yet...</h1>

        <img
          height={250}
          src="https://media.tenor.com/kjqof9l6gk8AAAAC/pikachu-sad.gif"
        />
        <h3 style={{ color: "GrayText" }}>
          Return to the Pokemon page to add Pokemon
        </h3>
        <br />
      </div>
    );
  }
  if (savedTeams) {
    return (
      <>
        <div style={{ display: "block", marginBottom: "2%" }}>
          {savedTeams.map((team, i) => (
            <>
              <Typography>Team #{i + 1}</Typography>
              <br />
              <div style={teamStyle}>
                <Team key={team.id} team={team} />
              </div>
              <br />
            </>
          ))}
          <br />
        </div>
      </>
    );
  }
  {
    return <div>Error</div>;
  }
}

export default TeamsList;
