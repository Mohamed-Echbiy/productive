import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SelectPriority({ updateState }) {
  return (
    <FormControl>
      <InputLabel id="priority-form">Priority</InputLabel>
      <Select
        label="priority"
        labelId="priority-form"
        color="primary"
        size="small"
        onChange={(e) => updateState(e.target.value)}
        defaultValue="low"
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="normal">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>
    </FormControl>
  );
}
