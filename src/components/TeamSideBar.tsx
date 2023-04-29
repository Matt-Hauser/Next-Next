import {
  capitalize,
  Drawer,
  ListItem,
  Typography,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Pokemon } from "../interfaces/interfaces";
import { removePokemon, saveTeam } from "../slices/teamCrudSlice";

function TeamSideBar() {
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.team.currentTeam);
  return (
    <Drawer
      PaperProps={{ sx: { width: "20%" } }}
      variant="permanent"
      open={open}
      anchor={"left"}
      onClose={() => setOpen(false)}
    >
      <div style={{ marginTop: "35%" }}>
        <img
          height={125}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pokemon_Go_League_Logo.png/1200px-Pokemon_Go_League_Logo.png?20201005193941"
        />
      </div>
      <div style={{ marginTop: "0%" }}></div>
      <ListItem divider style={{ justifyContent: "center", lineHeight: 3 }}>
        <Typography fontWeight={"bold"}>
          <h3>Your Team</h3>
        </Typography>
      </ListItem>

      {currentTeam && currentTeam.length > 0 ? (
        currentTeam.map((pokemon: Pokemon, index: number) => {
          return (
            <ListItem
              onClick={() => dispatch(removePokemon(pokemon))}
              divider
              className="TeamDrawerItem"
              style={{
                display: "flex",
                bottom: "3px",
                justifyContent: "space-between",
                alignItems: "center",
                lineHeight: 3,
              }}
            >
              <Typography>
                <h5>{capitalize(pokemon.name)}</h5>{" "}
              </Typography>

              <img
                style={{ marginBottom: "15px" }}
                height={60}
                //change to .icon
                src={pokemon.icon}
              />
            </ListItem>
          );
        })
      ) : (
        <ListItem style={{ display: "flex", justifyContent: "center" }} divider>
          <Typography>
            <h4 style={{ color: "GrayText" }}>No Pokemon in Team</h4>
          </Typography>
        </ListItem>
      )}

      <ListItem
        className="TeamDrawerItem"
        style={{ justifyContent: "center", lineHeight: 3 }}
      >
        <Typography fontWeight={"bold"}>
          <Button onClick={() => dispatch(saveTeam())}>Save Team</Button>
        </Typography>
      </ListItem>
    </Drawer>
  );
}
export default TeamSideBar;
