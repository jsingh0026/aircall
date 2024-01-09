import {
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import React from "react";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { secondsToMinutesAndSecondsFormatted } from "../../helper";

export const CallDetails = ({ data, open, setOpen }) => {
  const { direction, to, from, call_type, is_archived } = data[0];
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog size={"sm"}>
        <ModalClose />
        <DialogTitle>
          Call Details <Divider orientation="vertical" />{" "}
          <Typography
            level="body-sm"
            color={
              (call_type === "missed" && "danger") ||
              (call_type === "answered" && "success") ||
              (call_type === "voicemail" && "primary") ||
              "neutral"
            }
          >
            {call_type}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <List sx={{ "--ListItemDecorator-size": "56px" }} size="sm">
            <ListItem>
              <ListItemDecorator>
                {direction === "outbound" ? (
                  <PhoneForwardedIcon />
                ) : (
                  <PhoneCallbackIcon />
                )}
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="title-sm">
                  To: {to || "anonymous"}
                </Typography>
                <Typography level="body-sm">
                  From: {from || "anonymous"}
                </Typography>
              </ListItemContent>
            </ListItem>
            {data.map((details) => {
              const date = new Date(details.created_at);
              const { minutes, seconds } = secondsToMinutesAndSecondsFormatted(
                details.duration
              );
              return (
                <ListItem key={details.id}>
                  <List marker="circle" size="sm">
                    <ListItem>
                      <ListItemContent>
                        <Typography level="body-sm">
                          Last Subject{" "}
                          {date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </Typography>

                        <Typography level="body-sm">
                          Duration: {`${minutes}:${seconds}`}
                        </Typography>

                        <Typography level="body-sm">
                          Direction: {details.direction}
                        </Typography>
                      </ListItemContent>
                    </ListItem>
                  </List>
                </ListItem>
              );
            })}

            <ListItem>
              <ListItemContent>
                <Typography level="body-sm">
                  Archived: {is_archived.toString()}
                </Typography>
              </ListItemContent>
            </ListItem>
          </List>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
