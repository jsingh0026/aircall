import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Divider,
  Typography,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";
import Badge from "@mui/joy/Badge";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { useDrag } from "@use-gesture/react";
import ArchiveIcon from "@mui/icons-material/Archive";
import { CallDetails } from "../callDetails";
import InfoIcon from "@mui/icons-material/Info";

const CallTabs = ({ archive, calls, error, isArchivedTab }) => {
  const [activeIndex, setActiveIndex] = useState([]);
  const [archived, setArchived] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [archiveError, setArchiveError] = useState(false);
  const [style, set] = React.useState({ x: 0 });

  const bind = useDrag(({ down, movement: [x], direction: [dirX], args }) => {
    const callId = args[0];
    if (-x > 120 && !down) {
      setArchived(true);
      archive(callId).then((data) => {
        if (!data) {
          setArchiveError(true);
        }
      });
    }
    if (down && dirX === -1) {
      setActiveIndex(callId);
      set({ x });
    } else {
      set({ x: 0 });
      setTimeout(() => {
        setArchived(false);
      }, 2000);
    }
  });

  useEffect(() => {
    if (error) setArchiveError(true);
  }, [error]);

  return (
    <Box sx={{ minHeight: 480 }}>
      <Snackbar
        open={archiveError}
        autoHideDuration={5000}
        onClose={() => setArchiveError(false)}
        sx={{ position: "sticky", top: 116.5 }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {"Error archiving call(s)"}
        </Alert>
      </Snackbar>
      {Object.keys(calls).map((key) => {
        const callsList = calls[key];
        const date = new Date(key);
        return (
          <React.Fragment key={key}>
            <Divider sx={{ padding: "10px 0" }}>
              <Typography
                fontSize={"x-small"}
                color={"#b2b2b2"}
                lineHeight={1}
                fontWeight={600}
              >
                {date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Typography>
            </Divider>
            {Object.values(callsList).map((callData) => {
              const call = callData[0];
              const callId = call.id;
              const date = new Date(call.created_at);
              const timestamp = date.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "numeric",
                hour12: true,
              });
              return (
                <Box
                  key={call.id}
                  sx={{ padding: "0 20px", margin: "10px 0", display: "flex" }}
                >
                  {callId === activeIndex && openModal && (
                    <CallDetails
                      key={callId}
                      open={openModal}
                      setOpen={setOpenModal}
                      data={callData}
                    />
                  )}
                  <Card
                    {...bind(callId)}
                    style={{
                      // transform: `translate3d(${style.x}px, 0, 0)`,
                      transition: "transform 0.2s",
                      width: callId === activeIndex && archived ? "0%" : "100%",
                      zIndex: 1,
                      display: callId === activeIndex && archived && "none",
                      height: "56px",
                      touchAction: "none",
                    }}
                    elevation={0}
                    sx={{
                      border: 1,
                      borderColor: "lightgray",
                      borderRadius: 3,
                      backgroundColor: "white",
                      cursor: "pointer",
                      ":hover": {
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        paddingRight: 0,
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setOpenModal(true);
                          setActiveIndex(callId);
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                      {call.direction === "outbound" ? (
                        <CallMadeIcon
                          fontSize="small"
                          sx={{ color: "#b2b2b2" }}
                        />
                      ) : (
                        <CallReceivedIcon
                          fontSize="small"
                          sx={{ color: "#b2b2b2" }}
                        />
                      )}
                      <Box flex={1} paddingLeft={1.2}>
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography fontSize={"small"} fontWeight={600}>
                            {call.to || "anonymous"}
                          </Typography>
                          <Badge
                            badgeContent={
                              callData.length > 1 ? callData.length : 0
                            }
                            size="sm"
                            sx={{ marginLeft: 2 }}
                            color="danger"
                          />
                        </Box>
                        <Typography
                          fontSize={"x-small"}
                          fontWeight={600}
                          color={"#b2b2b2"}
                        >
                          {call.from || "anonymous"}
                        </Typography>
                      </Box>
                      <Box
                        className="left dotted-gradient"
                        paddingLeft={1}
                        sx={{
                          borderColor: "#b2b2b2",
                          display: "flex",
                          alignItems: "center",
                          borderWidth: "thin",
                        }}
                      >
                        <Typography
                          lineHeight={1}
                          fontSize={"small"}
                          color={"#b2b2b2"}
                          fontWeight={"bold"}
                        >
                          {timestamp.split(" ")[0]}
                        </Typography>
                        <Box
                          sx={{
                            border: 1,
                            borderRight: 0,
                            padding: "0 3px",
                            borderColor: "lightgray",
                            marginLeft: 1,
                            borderTopLeftRadius: 3,
                            borderBottomLeftRadius: 3,
                          }}
                        >
                          <Typography
                            fontSize={"xx-small"}
                            color={"#b2b2b2"}
                            fontWeight={"bold"}
                          >
                            {timestamp.split(" ")[1]}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                  <Card
                    {...bind()}
                    style={{
                      width: callId === activeIndex ? `${-style.x}%` : 0,
                      backgroundColor: isArchivedTab ? "#2e7d32" : "#ed6c02",
                      transition: style.x ? "none" : "width 0.2s",
                      marginLeft: "-12px",
                      padding:
                        callId === activeIndex
                          ? `0 ${style.x ? 20 : -style.x}px`
                          : 0,
                      display: "flex",
                      alignItems: "center",
                      height: "59px",
                    }}
                    elevation={0}
                  >
                    <ArchiveIcon sx={{ color: "white", paddingRight: 1 }} />
                    <Typography color={"white"}>
                      {isArchivedTab ? "Unarchive" : "Archive"}
                    </Typography>
                  </Card>
                </Box>
              );
            })}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default CallTabs;
