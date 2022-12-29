import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { SortUp, SortDown } from "../../Icons";

export default function SortByDate({ setDateSortMethod, sortDate }) {
  return (
    <FormControl className=" w-32">
      <InputLabel id="sortByDate-form" color="secondary">
        Sort By Date
      </InputLabel>
      <Select
        labelId="sortByDate-form"
        label="Sort By Date"
        size="small"
        onChange={(e) => setDateSortMethod(e.target.value)}
        value={sortDate}
        variant="standard"
        color="secondary"
        className="mb-5 capitalize"
      >
        <MenuItem value="asc">
          <Button
            size="small"
            color="primary"
            variant="text"
            endIcon={<SortDown />}
          >
            Oldest
          </Button>
        </MenuItem>
        <MenuItem value="desc">
          <Button
            size="small"
            color="primary"
            variant="text"
            endIcon={<SortUp />}
          >
            Newest
          </Button>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
