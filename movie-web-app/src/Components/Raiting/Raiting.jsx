import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";


const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#f1ad00"
  },
  "& .MuiRating-iconHover": {
    color: "#f1ad00"
  },
  "& .MuiRating-iconEmpty": {
    color: "white"
  }
});

const RatingBox = styled(Box)
`
margin-top:3px;
`
const CustomRating = (props)  =>{

  return (
    <RatingBox
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <StyledRating name="customized-color" 
         precision={0.5}  value={props.value} max={10} size="large" />
    </RatingBox>
  );
}

export default CustomRating