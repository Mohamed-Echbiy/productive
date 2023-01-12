import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Interaction } from "../context/interactionAuth";
import { Done } from "../Icons";

function NotificationCard() {
  const { notification, setNotification } = useContext(Interaction);
  return (
    <div
      className={`notification_card absolute transition-all duration-500 z-50 bg-white flex text-sm   ${
        notification ? "bottom-6 right-5" : "bottom-6 -right-80"
      }`}
    >
      <Button
        variant="contained"
        color="success"
        size="large"
        startIcon={<Done />}
        onClick={() => setNotification(false)}
      >
        Operation Completed.
      </Button>
      {/* <span
        className="absolute cursor-pointer text-red-500 -top-2 -right-2 z-40 "
        onClick={() => setNotification(false)}
      >
        <CloseAddTaskWindow />
      </span> */}
    </div>
  );
}

export default NotificationCard;
