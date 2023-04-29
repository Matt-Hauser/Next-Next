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
