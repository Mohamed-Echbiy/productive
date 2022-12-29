import { TextField } from "@mui/material";

export default function InputField({ state = "", updateState }) {
  return (
    <TextField
      type="text"
      color="primary"
      label="task name"
      size="small"
      onChange={(e) => updateState(e.target.value)}
      error={state ? true : false}
      helperText={state && "task name cannot be empty"}
    />
  );
}
