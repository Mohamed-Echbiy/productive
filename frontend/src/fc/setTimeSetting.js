export const setTimeSetting = (
  roundTime = 25,
  shortBreak = 5,
  longBreak = 15,
  todayGoal = 0
) => {
  localStorage.setItem("pomoTime", roundTime);
  localStorage.setItem("pomoShortBreak", shortBreak);
  localStorage.setItem("pomoLongBreak", longBreak);
  localStorage.setItem("todayGoal", todayGoal);
  window.location.reload();
};
