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
            <div style={{ justifyContent: "center" }}>
              <CardMedia
                sx={{ objectFit: "contain" }}
                height={100}
                component="img"
                image={pokemon.imageHQ}
              />
            </div>

            <CardContent>
              <Typography>
                <p>
                  {capitalize(pokemon.name)} #{pokemon.id}
                </p>
                <p>Types:</p>
                <img
                  height="30px"
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/type-logos/gen8/${pokemon.types[0].type.name}.png`}
                />{" "}
                {pokemon.types.length > 1 ? (
                  <img
                    height="30px"
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/type-logos/gen8/${pokemon.types[1].type.name}.png`}
                  />
                ) : (
                  ""
                )}
              </Typography>
              <Typography></Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default Team;
