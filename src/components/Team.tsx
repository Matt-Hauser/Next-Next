import {
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function Team({ team }) {
  return (
    <>
      {team.map((pokemon, i) => {
        return (
          <Card
            sx={{
              marginLeft: "1%",
              marginRight: "1%",
              maxWidth: "100%",
            }}
            key={i}
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
              <Typography>{capitalize(pokemon.name)}</Typography>
              <Typography>{pokemon.description}</Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default Team;
