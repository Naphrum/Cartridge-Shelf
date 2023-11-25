import { useState, useEffect } from "react";
import axios from "axios";

const Collection = () => {
    const [userCollection, setUserCollection] = useState([]);
    useEffect(() => {
        axios
          .get("/v1/collection")
          .then((response) => {
            setUserCollection(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default Collection
