import { Button } from "@mui/material";
import React from "react";
import { Trophy } from "../../Icons";

export default function AdvancementPlate() {
  return (
    <Button
      variant="contained"
      disableElevation
      color="secondary"
      className=" w-52 capitalize h-16 px-4 flex items-center justify-center bg-yellow-700"
      endIcon={<Trophy />}
    >
      Goal Reached
    </Button>
  );
}
