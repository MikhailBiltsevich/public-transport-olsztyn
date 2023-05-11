import { Box, Container } from "@mui/material";
import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SearchStopsForm from "~/features/search-stops-form/ui/SearchStopsForm";
import { getStreets } from "~/shared/api.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Public Transport in Olsztyn" }];
};

export async function loader() {
  const streets = await getStreets();
  return json(streets);
}

export default function Index() {
  const streets = useLoaderData<typeof loader>();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchStopsForm streets={streets} />
      </Box>
    </Container>
  );
}
