import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { Street } from "~/entities/street/models/Street";

type Props = {
  streets: Street[];
};

export const StreetSelect = ({ streets }: Props) => {
  return (
    <FormControl fullWidth sx={{ m: 0, minWidth: 100 }}>
      <InputLabel id="search-type-label">Street</InputLabel>
      <Select
        name="value"
        id="street-select"
        labelId="search-type-label"
        label="Street"
        defaultValue=""
      >
        {streets.map((street) => (
          <MenuItem key={street.id} value={street.id}>
            {street.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
