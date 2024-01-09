import React from "react";
import CallTabs from "../components/callTab/index.jsx";
import useActivities from "../hooks/activities/index.js";
import BottomTabs from "../components/bottomTabs/index.jsx";
import { ArchiveButton } from "../components/archiveButton/index.jsx";
import ActivityLoader from "../components/loader/activity.js";
import { useBottomTabs } from "../hooks/bottomTabs/index.js";
import { Box, Typography } from "@mui/material";
import { combineObjectsByDay } from "../helper/index.js";

export const Activity = () => {
  const { currentTab, setCurrentTab, isArchivedTab } = useBottomTabs();
  const { isLoading, archive, data, archiveAll, serverError } =
    useActivities(isArchivedTab);
  return (
    <React.Fragment>
      <ArchiveButton
        isArchivedTab={isArchivedTab}
        disabled={!data.length}
        actionButton={archiveAll}
      />
      {!data.length && isLoading ? (
        <ActivityLoader />
      ) : data.length ? (
        <CallTabs
          error={serverError}
          calls={combineObjectsByDay(data)}
          archive={archive}
          isArchivedTab={isArchivedTab}
        />
      ) : (
        <Box
          sx={{
            height: 476,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={500} color={"darkgray"}>
            No Content
          </Typography>
        </Box>
      )}
      <BottomTabs tab={currentTab} setTab={setCurrentTab} />
    </React.Fragment>
  );
};
