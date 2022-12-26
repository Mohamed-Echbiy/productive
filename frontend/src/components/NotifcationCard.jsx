import React from "react";
import { useContext } from "react";
import { Interaction } from "../context/interactionAuth";
import { CloseAddTaskWindow, Done } from "../Icons";

function NotificationCard() {
  const { notification, setNotification } = useContext(Interaction);
  return (
    <div
      className={`notification_card absolute transition-all duration-500 z-50 bg-white flex text-sm w-64 border-green-400 rounded border border-solid  p-4 ${
        notification ? "bottom-6 right-5" : "bottom-6 -right-80"
      }`}
    >
      <span className="text-green-700 mr-3">
        <Done />
      </span>
      Operation Completed.
      <span
        className="absolute cursor-pointer text-red-500 -top-2 -right-2 z-40 bg-white"
        onClick={() => setNotification(false)}
      >
        <CloseAddTaskWindow />
      </span>
    </div>
  );
}

export default NotificationCard;
