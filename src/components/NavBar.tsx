import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CatchingPokemon } from "@mui/icons-material";
import { FormControl, Icon, InputLabel, Select } from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const WhiteIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
}));
const BlackIconButton = styled(IconButton)(({ theme }) => ({
  color: "darkred",
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  display: "block",
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = ({ numInTeam }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const iconsArray = Array.from({ length: 6 });
  return (
    <StyledAppBar color="warning" position="fixed">
      <Toolbar>
        {iconsArray.map((_, idx) => (
          <React.Fragment key={idx}>
            {idx >= numInTeam ? (
              <WhiteIconButton edge="start" aria-label={`pokemon-${idx}`}>
                <CatchingPokemon fontSize="large" />
              </WhiteIconButton>
            ) : (
              <BlackIconButton edge="start" aria-label={`pokemon-${idx}`}>
                <CatchingPokemon fontSize="large" />
              </BlackIconButton>
            )}
          </React.Fragment>
        ))}
        <Icon style={{ flex: "1" }}></Icon>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Filter By Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={"TestValue"}
            // onChange={handleChange}
            label="Type Filter"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Icon style={{ flex: "1" }}></Icon>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          style={{ flex: "1" }}
        />
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
