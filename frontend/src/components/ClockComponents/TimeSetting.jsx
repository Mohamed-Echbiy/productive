import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useState } from "react";
import { setTimeSetting } from "../../fc/setTimeSetting";
import { CloseAddTaskWindow } from "../../Icons";

export default function TimeSetting({ setSetting }) {
  const [roundTime, setRoundTime] = useState(
    localStorage.getItem("pomoTime") || 25
  );
  const [shortBreak, setShortBreak] = useState(
    localStorage.getItem("pomoShortBreak") || 5
  );
  const [longBreak, setLongBreak] = useState(
    localStorage.getItem("pomoLongBreak") || 15
  );
  const [todayGoal, setTodayGoal] = useState(
    localStorage.getItem("todayGoal") || 4
  );
  const lunchSetTmeSetting = () => {
    setSetting(false);
    setTimeSetting(roundTime, shortBreak, longBreak, todayGoal);
  };
  // console.log(roundTime, shortBreak, longBreak);
  return (
    <div className=" setting-window w-fit border-2 border-solid border-gray-900 p-5 rounded relative">
      <Stack direction="row" spacing={2} alignItems="center" className="mb-5">
        <TextField
          fullWidth
          label="Today goal"
          type="number"
          color="warning"
          defaultValue={todayGoal}
          onChange={(e) => setTodayGoal(e.target.value)}
          InputProps={{
            inputProps: { min: "2" },
            endAdornment: <InputAdornment position="end">Round</InputAdornment>,
          }}
          helperText="Please specify how many round you are aiming for"
        />
        {/* <Typography variant="body2">Min</Typography> */}
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" className="mb-5">
        <TextField
          fullWidth
          label="Round time"
          type="number"
          color="warning"
          defaultValue={roundTime}
          onChange={(e) => setRoundTime(e.target.value)}
          InputProps={{
            inputProps: { min: "5" },
            endAdornment: <InputAdornment position="end">Min</InputAdornment>,
          }}
          helperText="Set time for each round"
        />
        {/* <Typography variant="body2">Min</Typography> */}
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" className="mb-5">
        <TextField
          fullWidth
          label="Short break"
          type="number"
          color="warning"
          defaultValue={shortBreak}
          onChange={(e) => setShortBreak(e.target.value)}
          InputProps={{
            inputProps: { min: "1" },
            endAdornment: <InputAdornment position="end">Min</InputAdornment>,
          }}
          helperText="Set time for your short break after each round"
        />
        {/* <Typography variant="body2">Min</Typography> */}
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" className="mb-5">
        <TextField
          fullWidth
          label="Long break"
          type="number"
          color="warning"
          defaultValue={longBreak}
          onChange={(e) => setLongBreak(e.target.value)}
          InputProps={{
            inputProps: { min: "3" },
            endAdornment: <InputAdornment position="end">Min</InputAdornment>,
          }}
          helperText="Set time for your long break after end of the last round"
        />
        {/* <Typography variant="body2">Min</Typography> */}
      </Stack>
      <div
        className="closeSetting absolute -left-3 -top-3 z-50 bg-white cursor-pointer"
        onClick={() => setSetting(false)}
      >
        <CloseAddTaskWindow />
      </div>
      <Button variant="contained" color="warning" onClick={lunchSetTmeSetting}>
        Save
      </Button>
    </div>
  );
}
