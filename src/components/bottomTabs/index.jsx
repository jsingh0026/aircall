import React from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Restore } from "@mui/icons-material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { BottomTabValues } from "../config";
const BottomTabs = ({ setTab, tab }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        marginTop: 2,
        borderTop: 1,
        zIndex: 10,
        borderColor: "lightgray",
      }}
    >
      <BottomNavigation
        showLabels
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue);
        }}
      >
        <BottomNavigationAction
          value={BottomTabValues.allCalls}
          label="All Calls"
          icon={<Restore />}
        />
        <BottomNavigationAction
          value={BottomTabValues.archivedCalls}
          label="Archived Calls"
          icon={<Inventory2Icon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomTabs;
