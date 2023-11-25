import { useState, useEffect } from "react";
import axios from "axios";

const Games = () => {
  const [gameList, setGameList] = useState([]);
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

  return <h1>Games</h1>;
};

export default Games;
