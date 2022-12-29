import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Done, Inbox, Pending } from "../../Icons";

export default function FilterByActions({ active, setActive }) {
  return (
    <>
      <FormControl className=" w-36">
        <InputLabel id="filterByAction-form" color="secondary">
          Task Status
        </InputLabel>
        <Select
          labelId="filterByAction-form"
          label="Sort By Date"
          size="small"
          onChange={(e) => setActive(e.target.value)}
          value={active}
          variant="standard"
          color="secondary"
          className="mb-5 capitalize"
        >
          <MenuItem value="all">
            <Button
              size="small"
              color="secondary"
              variant="text"
              endIcon={<Inbox />}
            >
              Inbox
            </Button>
          </MenuItem>
          <MenuItem value="completed">
            <Button
              size="small"
              color="success"
              variant="text"
              endIcon={<Done />}
            >
              Completed
            </Button>
          </MenuItem>
          <MenuItem value="pending">
            <Button
              size="small"
              color="warning"
              variant="text"
              endIcon={<Pending />}
            >
              Pending
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
