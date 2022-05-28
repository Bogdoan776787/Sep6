import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import Typography from "@mui/material/Typography";

export default function Raiting() {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">Vote</Typography>
      <Rating name="customized-10" defaultValue={2} max={10} />
    </Box>
  );
}
