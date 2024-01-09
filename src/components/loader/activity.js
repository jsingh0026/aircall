import { Box, Skeleton } from "@mui/material";
import React from "react";

const ActivityLoader = () => {
  return (
    <Box sx={{ paddingTop: 2 }}>
      {Array.apply(null, { length: 10 }).map((i, index) => (
        <Box key={index} padding={"10px 20px"}>
          <Skeleton variant="rounded" height={50} />
        </Box>
      ))}
    </Box>
  );
};

export default ActivityLoader;
