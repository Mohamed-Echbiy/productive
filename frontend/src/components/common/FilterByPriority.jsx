import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FilterIcon, PriorityFlag } from "../../Icons";
export default function FilterByPriority({ updateVariant, variant }) {
  return (
    <FormControl className=" w-32">
      <InputLabel id="filter-form" color="secondary">
        FilterByPriority
      </InputLabel>
      <Select
        labelId="filter-form"
        label="filterByPriority"
        size="small"
        onChange={(e) => updateVariant(e.target.value)}
        value={variant}
        variant="standard"
        color="secondary"
        className="mb-5 capitalize text-white"
      >
        <MenuItem value="all">
          <Button
            size="small"
            color="primary"
            variant="text"
            endIcon={<PriorityFlag />}
          >
            All
          </Button>
        </MenuItem>
        <MenuItem value="high">
          <Button
            size="small"
            color="error"
            variant="text"
            endIcon={<PriorityFlag />}
          >
            High
          </Button>
        </MenuItem>
        <MenuItem value="normal">
          <Button
            size="small"
            color="warning"
            variant="text"
            endIcon={<PriorityFlag />}
          >
            Normal
          </Button>
        </MenuItem>
        <MenuItem value="low">
          <Button
            size="small"
            color="success"
            variant="text"
            endIcon={<PriorityFlag />}
          >
            Low
          </Button>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
