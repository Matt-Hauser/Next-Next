import {
  ButtonGroup,
  Button,
  Drawer,
  ListItem,
  Paper,
  Typography,
  capitalize,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import NavBar from "./NavBar";
import Roster from "./Roster";
import "./PokeApp.css";
import axios from "axios";
import { Pokemon } from "../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { removePokemon, saveTeam, TeamState } from "../slices/teamCrudSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import TeamSideBar from "./TeamSideBar";
import MoveRoster from "./MoveRoster";
import TeamsList from "./TeamsList";

function PokeApp() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  //   const [currentTeam, setCurrentTeam] = useState<Pokemon[]>([
  //     {
  //       name: "Venusaur",
  //       tinyImage:
  //         "https://img.pokemondb.net/sprites/sword-shield/normal/venusaur.png",
  //     },
  //     {
  //       name: "Charizard",
  //       tinyImage:
  //         "https://img.pokemondb.net/sprites/sword-shield/normal/charizard.png",
  //     },
  //     {
  //       name: "Blastoise",
  //       tinyImage:
  //         "https://img.pokemondb.net/sprites/sword-shield/normal/blastoise.png",
  //     },
  //     {
  //       name: "Pikachu",
  //       tinyImage:
  //         "https://img.pokemondb.net/sprites/sword-shield/normal/pikachu.png",
  //     },
  //     {
  //       name: "Arcanine",
  //       tinyImage:
  //         "https://img.pokemondb.net/sprites/sword-shield/normal/arcanine.png",
  //     },
  //     {
  //       name: "Nidoking",
  //       tinyImage:
  //         "https://img.pokemondb.net/sprites/sword-shield/normal/nidoking.png",
  //     },
  //   ]);
  const currentTeam = useSelector((state) => state.team.currentTeam);
  const savedTeams = useSelector((state) => state.team.savedTeams);
  let numInTeam = 0;
  if (currentTeam.length > 0) numInTeam = currentTeam.length;

  const dispatch = useDispatch();
  useEffect(() => {
    async function getPokemon() {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?limit=151"
        );
        const fetches = res.data.results.map((p) => axios.get(p.url));

        const data = await Promise.all(fetches);
        const pokemonData = data.map((response) => {
          return {
            name: response.data.name,
            id: response.data.id,
            stats: response.data.stats,
            description: "",
            types: response.data.types,
            moves: response.data.moves,
            image: response.data.sprites.front_default,
            imageHQ: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
            icon: `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${response.data.name}.png`,
          };
        });
        const descriptionFetches = pokemonData.map((p) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${p.id}`)
        );

        const descriptionData = await Promise.all(descriptionFetches);

        descriptionData.forEach((response, index) => {
          pokemonData[index].description =
            response.data.flavor_text_entries[0].flavor_text;
        });

        setPokemonList(pokemonData);

        console.log(pokemonData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getPokemon();
  }, []);
  const navigate = useNavigate();
  const handleClickMoves = useCallback(
    () => navigate("/moves", { replace: true }),
    [navigate]
  );
  const handleClickPokemon = useCallback(
    () => navigate("/", { replace: true }),
    [navigate]
  );
  const handleClickTeams = useCallback(
    () => navigate("/teams", { replace: true }),
    [navigate]
  );

  //make a debounce search
  //unrelated: build a game sequence using turn as generated values.
  // turn {1, 0} {0, 1} [0,] [1] turn is pre processed at move choice and fed to for loop. might stop random enemy moves.
  console.log(currentTeam);
  return (
    <>
      <Paper sx={{ backgroundColor: "orange" }} elevation={1}>
        <NavBar numInTeam={numInTeam} />
        <br></br>
        <TeamSideBar></TeamSideBar>

        <div
          style={{
            marginTop: "5%",
            marginBottom: "10px",
            width: "80%",
            marginLeft: "20%",
          }}
        >
          <ButtonGroup
            color="inherit"
            variant="text"
            aria-label="text button group"
          >
            <Button onClick={handleClickPokemon}>Pokemon</Button>
            <Button onClick={handleClickMoves}>Moves</Button>
            <Button onClick={handleClickTeams}>My Teams</Button>
          </ButtonGroup>
        </div>
      </Paper>

      <Paper sx={{ backgroundColor: "lightgoldenrod" }}>
        <br />
        <div style={{ width: "80%", marginLeft: "20%" }}>
          <Routes>
            <Route
              path="/"
              element={<Roster pokemonList={pokemonList} loading={loading} />}
            ></Route>
            <Route path="/moves" element={<MoveRoster></MoveRoster>}></Route>
            <Route
              path="/teams"
              element={
                <TeamsList
                  loading={loading}
                  savedTeams={savedTeams}
                ></TeamsList>
              }
            ></Route>
          </Routes>
        </div>
      </Paper>
    </>
  );
}

export default PokeApp;
