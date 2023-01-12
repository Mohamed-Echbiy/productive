import { useState, useEffect } from "react";
import useSound from "use-sound";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Setting } from "../../Icons";
import TimeSetting from "./TimeSetting";
// import AdvancementPlate from "./AdvancementPlate";
import goal_reached from "../../sounds/goalReached.ogg";

// import roundSoundCompleted from "../../sounds/announcement-sound-4-21464.mp3";
import breakSoundCompleted from "../../sounds/ding-idea-40142.mp3";
import PendingTasks from "../homeComponents/PendingTasks";
import StaticInfo from "./StaticInfo";

export default function Clock() {
  const [Play] = useSound(goal_reached);

  // const [RoundSoundCompleted] = useSound(roundSoundCompleted);
  const [BreakSoundCompleted] = useSound(breakSoundCompleted);
  const [time, setTime] = useState({
    minutes: localStorage.getItem("pomoTime"),
    secondes: 0,
  });
  const [isCountStarted, setCountState] = useState(false);
  const [isItWork, setWork] = useState(true);
  const [isItBreak, setBreak] = useState(false);
  const [pomo] = useState(+localStorage.getItem("todayGoal") || 4);
  const [settingActive, setSetting] = useState(false);
  const [howManyRound, setRoundCount] = useState(
    localStorage.getItem("round") || 0
  );
  const [goalReached, setgoalReached] = useState(0);
  const count = () => {
    if (time.secondes) {
      setTime((pre) => ({ ...pre, secondes: time.secondes - 1 }));
    }
    !time.secondes &&
      setTime(() => ({ minutes: time.minutes - 1, secondes: 59 }));
  };
  // console.log(howManyRound);
  useEffect(() => {
    // console.log(localStorage.getItem("round"));
    // const date = new Date().toISOString();
    // const T = date.indexOf("T");
    // if (localStorage.getItem("todayDate") === date.slice(0, T)) {
    //   setgoalReached(1);
    //   // console.log("equal");
    // } else {
    //   // localStorage.setItem("round", howManyRound);
    //   setgoalReached(0);
    //   // console.log("not equal");
    // }
    if (!localStorage.getItem("pomoTime")) {
      localStorage.setItem("pomoTime", 25);
      localStorage.setItem("pomoLongBreak", 15);
      localStorage.setItem("pomoShortBreak", 5);
      localStorage.setItem("todayGoal", pomo);
    }
    if (!time.secondes && !time.minutes && isItWork) {
      setCountState(false);
      Play();
      setBreak((p) => !p);
      setTime((pre) => ({
        secondes: 0,
        minutes:
          howManyRound === pomo - 1
            ? localStorage.getItem("pomoLongBreak")
            : localStorage.getItem("pomoShortBreak"),
      }));
      const workedTime = localStorage.getItem("workedTime");
      console.log(workedTime, "workedTime is");
      const clcTime = +workedTime ? workedTime : 0;
      console.log(clcTime, workedTime, "test clcTime");
      localStorage.setItem(
        "workedTime",
        +clcTime + +localStorage.getItem("pomoTime")
      );
      // localStorage.setItem("round", +localStorage.getItem("round") + 1);
      setWork((p) => !p);
      setRoundCount((pre) => pre + 1);
    }
    if (!time.secondes && !time.minutes && isItBreak) {
      setCountState(false);
      BreakSoundCompleted();
      setBreak((p) => !p);
      setTime((pre) => ({
        minutes: localStorage.getItem("pomoTime"),
        secondes: 0,
      }));
      setWork((p) => !p);
    }
    if (isCountStarted) {
      const interval = setInterval(() => {
        count();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCountStarted, time, settingActive]);

  // if (+pomo === howManyRound && !goalReached) {
  //   Play();
  //   setgoalReached(1);
  //   const date = new Date().toISOString();
  //   const T = date.indexOf("T");
  //   localStorage.setItem("todayDate", date.slice(0, T));
  // }
  // console.log(pomo, howManyRound);
  return (
    <>
      {/* {goalReached ? (
        <div
          className={` transition-all duration-500 flex justify-center items-center w-full`}
        >
          <AdvancementPlate />
        </div>
      ) : (
        <></>
      )} */}
      <div className={`relative py-8  md:flex items-center justify-around`}>
        {!settingActive && (
          <div
            className="setting-icon absolute -top-10 left-0 z-50 cursor-pointer"
            onClick={() => setSetting(true)}
          >
            <Setting />
          </div>
        )}
        <div
          className={` m-auto flex flex-wrap items-center justify-center h-fit text-7xl md:text-6xl xl:text-9xl py-5 relative ${
            settingActive && "blur-sm"
          }`}
        >
          <div className="minutes max-w-xs w-5/12 flex-grow text-center sm:mr-5 px-5 py-8 bg-gray-900 text-white rounded-md ">
            {time.minutes < 10 ? `0${time.minutes}` : time.minutes}
          </div>
          <div className="dots mr-5 w-full text-center sm:w-fit">:</div>
          <div className="secondes max-w-xs w-5/12 flex-grow text-center px-5 py-8  bg-gray-900 text-white rounded-md">
            {time.secondes < 10 ? `0${time.secondes}` : time.secondes}
          </div>
          <Stack
            spacing={4}
            className={`w-full mx-auto mt-16 ${settingActive && "blur-sm "}`}
          >
            <Button
              className=""
              variant="contained"
              color="warning"
              size="large"
              onClick={() => setCountState((pre) => !pre)}
            >
              {!isItWork ? (
                <p> Break</p>
              ) : (
                <p>{!isCountStarted ? "Start" : "Pause"}</p>
              )}
            </Button>
          </Stack>
        </div>

        <div
          className={`setting absolute scale-0 -top-10 transition-all left-2 z-50 h-fit bg-white flex items-center justify-center ${
            settingActive && " scale-100"
          }`}
        >
          <TimeSetting setSetting={setSetting} />
        </div>
        <div
          className={`tasks mt-8 md:mt-0 md:w-2/4 ${
            settingActive && "blur-sm"
          }`}
        >
          <PendingTasks />
        </div>
      </div>
      <div className="today-statics">
        <StaticInfo />
      </div>
    </>
  );
}
