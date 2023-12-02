import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Grid } from "@mui/material";


const Games = () => {
  const [gameList, setGameList] = useState([]);
  const [userGamesInCollection, setUserGamesInCollection] = useState([]);
  const { user, collection, addGameToCollection } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("/v1/games")
      .then((response) => {
        setGameList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addGame = (game) => {
    setUserGamesInCollection((previousUserGamesInCollection) => [...previousUserGamesInCollection, game])
    addGameToCollection(user.id, game.id);
    console.log("Game Added")
  }


  const renderGames = () => {
    if (gameList) {
      return gameList.map((game) => {
        return (
          <Grid item xs={3}>
            <Card
              sx={{
                maxWidth: 300,
                background: "#C2C2C2",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                <CardMedia
                  sx={{ height: 352, width: 264 }}
                  image={`http://${game.coverUrl}`}
                  title={`${game.name}`}
                />
                <IconButton onClick={() => {addGame(game)}}>
                  <AddIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        );
      });
    }
  };

  return (
    <Grid container spacing={6}>
      <>{renderGames()}</>
    </Grid>
  );
};

export default Games;
