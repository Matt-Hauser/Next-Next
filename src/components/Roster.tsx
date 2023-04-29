import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  capitalize,
} from "@mui/material";
import PokeApp from "./PokeApp";
import { useDispatch } from "react-redux";
import { addPokemon } from "../slices/teamCrudSlice";
import "./Roster.css";
function Roster({ pokemonList, loading }) {
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
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        rowGap: "30px",
      }}
    >
      {pokemonList.map((pokemon) => (
        <Card
          sx={{
            marginLeft: "1%",
            marginRight: "1%",
            maxWidth: "40%",
          }}
          key={pokemon.id}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              sx={{ objectFit: "contain" }}
              height={100}
              component="img"
              image={pokemon.imageHQ}
            />
          </div>

          <CardContent>
            <Typography>
              <h4>{capitalize(pokemon.name)}</h4>
            </Typography>
          </CardContent>
          <CardActions>
            <Button>View Stats</Button>
            <Button onClick={() => dispatch(addPokemon(pokemon))}>
              Add To Team
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Roster;
