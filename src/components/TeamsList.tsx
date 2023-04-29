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
      <div style={{ display: "block" }}>
        {savedTeams.map((team) => (
          <div style={teamStyle}>
            <Team key={team.id} team={team} />
          </div>
        ))}
      </div>
    );
  }
  {
    return <div>Error</div>;
  }
}

export default TeamsList;
