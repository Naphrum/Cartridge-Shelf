import { useState } from "react";
import Rating from "@mui/material/Rating";

const StarRating = ( {handleChange, id, rating} ) => {
    const [starRating, setStarRating] = useState(rating);
  return <Rating 
    name="simple-controlled"
    value={starRating}
    onChange={(event, newValue) => {
        setStarRating(newValue)
        console.log(handleChange)
        handleChange(id, newValue)
    }}
    />
};

export default StarRating;
