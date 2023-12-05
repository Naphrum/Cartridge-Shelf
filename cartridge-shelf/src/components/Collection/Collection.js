import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StarRating from "../StarRating";
import { Grid } from "@mui/material";

const Collection = () => {
  const [userCollection, setUserCollection] = useState([]);
  const { user } = useContext(AppContext);
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

  const removeGameFromUserCollection = async (gameId) => {
    try {
      axios.delete(`/v1/collection/${gameId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStarRating = async (id, rating) => {
    console.log("STAR_RATING:  ", rating);
    try {
      axios.put(`/v1/collection/${id}`, { user_star_rating: rating });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGame = async (game) => {
    try {
      await removeGameFromUserCollection(game.id);
      setUserCollection((newGameList) => {
        const indexToRemove = newGameList.findIndex(
          (vgm) => vgm.id === game.id
        );
        newGameList.splice(indexToRemove, 1);
        return [...newGameList]
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container spacing={6}>
      <>{userCollection.map((collectionGame) => {
        return (
          <Grid key={collectionGame.id} item xs={3}>
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
                <StarRating
                  handleChange={handleStarRating}
                  id={collectionGame.id}
                  rating={collectionGame.user_star_rating}
                />
                <IconButton
                  onClick={() => {
                    deleteGame(collectionGame);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        );
      })}</>
    </Grid>
  );
};

export default Collection;
