import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import type {
  LoaderArgs,
  TypedResponse,
  V2_MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Stop } from "~/entities/stop/models/Stop";
import { StopCard } from "~/entities/stop/ui/StopCard";
import {
  getStopsByName,
  getStopsByNumber,
  getStopsOnStreet,
} from "~/shared/api.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Search results" }];
};

export async function loader({
  request,
}: LoaderArgs): Promise<TypedResponse<Stop[]>> {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const value = url.searchParams.get("value");

  if (!type || !value) {
    return json([]);
  }

  let searchResult: Stop[] = [];
  switch (type) {
    case "stop-name":
      searchResult = await getStopsByName(value);
      break;
    case "stop-number":
      searchResult = await getStopsByNumber(value);
      break;
    case "street":
      searchResult = await getStopsOnStreet(value);
      break;
  }

  return json(searchResult);
}

export default function Index() {
  const stops = useLoaderData<typeof loader>();

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "24px" }}>
      <Grid container spacing={2}>
        {stops?.map((stop: Stop) => (
          <Grid key={stop.id} xs={12} sm={6} md={4} lg={3}>
            <StopCard stop={stop} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
