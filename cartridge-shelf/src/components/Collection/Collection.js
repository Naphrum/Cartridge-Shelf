import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Grid } from "@mui/material";

const Collection = () => {
  const [userCollection, setUserCollection] = useState([]);
  const [gamesInCollection, setGamesInCollection] = useState([]);
  const { user, collection, deleteGameFromCollection } = useContext(AppContext);
  useEffect(() => {
    axios
      .get(`/v1/users/${user.id}/collection`)
      .then((response) => {
        setUserCollection(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const removeGameFromUserCollection = async (gameId) =>{
    console.log("GAME_ID:  ", gameId)
    try{
      axios
      .delete(`/v1/collection/${gameId}`)
    } catch (e) {
      console.error(e)
    }
  }

  const deleteGame = async (game) => {
    try{

      const newGamelist = [...userCollection];
      console.log("GAME:  ", game)
      console.log(newGamelist)
      const indexToRemove = newGamelist.findIndex(
        vgm => vgm.game_id === game.id
        );
        await removeGameFromUserCollection(game.id)
        newGamelist.splice(indexToRemove, 1);
        setUserCollection(newGamelist);
      } catch (e) {
        console.error(e)
      }
  };

  const renderUserCollection = () => {
    if (userCollection) {
      return userCollection.map((collectionGame) => {
        return (
          <Grid
          key={collectionGame.id}
          item xs={3}>
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
                  image={`http://${collectionGame.game.coverUrl}`}
                  title={`${collectionGame.game.name}`}
                />
                <IconButton onClick={() => {deleteGame(collectionGame)}}>
                  <DeleteForeverIcon />
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
      <>{renderUserCollection()}</>
    </Grid>
  );
};

export default Collection;
