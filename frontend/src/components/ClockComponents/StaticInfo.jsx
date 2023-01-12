import { Button, Typography } from "@mui/material";

export default function StaticInfo() {
  return (
    <div className="flex items-center flex-col ">
      <div className=" uppercase  py-10 mb-4 rounded-md ">
        <Typography variant="h4" marginBottom={3} align="center">
          My Statics
        </Typography>
        <div className="flex flex-col items-center md:flex-row ">
          <Button
            variant="contained"
            className="Static_Button mb-4 md:mb-0 "
            color="warning"
            disableElevation
          >
            You Have Worked
          </Button>
          <span className="mx-1 md:mx-2 md:block">:</span>
          <Button
            variant="contained"
            className="Static_Button mb-4 md:mb-0"
            disableElevation
          >
            {(+localStorage.getItem("workedTime") / 60).toPrecision(1)} hours
          </Button>
          <span className="  mx-1 md:mx-2 md:block">=</span>
          <Button
            variant="contained"
            className="Static_Button mb-4 md:mb-0"
            color="secondary"
            disableElevation
          >
            {+localStorage.getItem("workedTime")} Minutes
          </Button>
          <span className="mx-1 md:mx-2 md:block">=</span>
          <Button
            variant="contained"
            className="Static_Button mb-4 md:mb-0"
            color="success"
            disableElevation
          >
            {+localStorage.getItem("workedTime") * 60} secondes
          </Button>
        </div>
      </div>
    </div>
  );
}
