import React from "react";
import { Box, Button } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";

export const ArchiveButton = ({ disabled, isArchivedTab, actionButton }) => {
  return (
    <Box padding={"0 20px"} position={"sticky"} top={80} zIndex={10}>
      <Button
        fullWidth
        sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        startIcon={<ArchiveIcon />}
        variant="contained"
        disabled={disabled}
        color={isArchivedTab ? "success" : "warning"}
        onClick={actionButton}
      >
        {isArchivedTab ? "Unarchive all calls" : "Archive all calls"}
      </Button>
    </Box>
  );
};
