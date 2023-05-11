import type { SelectChangeEvent } from "@mui/material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Form } from "@remix-run/react";
import { useState } from "react";
import type { Street } from "~/entities/street/models/Street";
import { StreetSelect } from "../../street-select/ui/StreetSelect";

type Props = {
  streets: Street[];
};

export default function SearchStopsForm({ streets }: Props) {
  const [searchType, setSearchType] = useState("stop-name");

  const handleSearchTypeChange = (event: SelectChangeEvent<string>) => {
    setSearchType(event.target.value);
  };

  return (
    <Form method="GET" action="/search">
      <Stack spacing={3} minWidth={400}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <FormControl sx={{ m: 0, minWidth: 100 }}>
            <InputLabel id="search-type-label">Search by</InputLabel>
            <Select
              labelId="search-type-label"
              id="search-type-select"
              value={searchType}
              onChange={handleSearchTypeChange}
              label="Search by"
              name="type"
            >
              <MenuItem value="street">Street</MenuItem>
              <MenuItem value="stop-name">Stop name</MenuItem>
              <MenuItem value="stop-number">Stop number</MenuItem>
            </Select>
          </FormControl>
          {searchType === "street" ? (
            <StreetSelect streets={streets} />
          ) : (
            <TextField name="value" sx={{ flexGrow: 1 }} label="Stop" />
          )}
        </Stack>
        <Button type="submit" size="large" variant="contained">
          Search
        </Button>
      </Stack>
    </Form>
  );
}
