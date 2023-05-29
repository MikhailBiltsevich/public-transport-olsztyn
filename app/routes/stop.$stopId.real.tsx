import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import type { LoaderArgs } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRealDepartures } from "~/shared/api.server";
import ErrorBoundaryDefault from "~/shared/error-boundary";

export function ErrorBoundary() {
  return <ErrorBoundaryDefault />;
}

export async function loader({ params }: LoaderArgs) {
  if (!params.stopId || Number.isNaN(+params.stopId)) {
    throw new Response("Bad request", { status: 400 });
  }

  const realDepartures = await getRealDepartures(params.stopId);
  return json(realDepartures);
}

export default function Index() {
  const realDepartures = useLoaderData<typeof loader>();

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
      <Stack spacing={2}>
        <Paper>
          <Stack spacing={1}>
            <Stack p={2} direction="row" justifyContent="space-between">
              <Typography>{realDepartures.stop.name}</Typography>
              <Typography>{realDepartures.time}</Typography>
            </Stack>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {realDepartures.stop.day.routes.map((route, index) => (
                    <TableRow key={`${route.number}-${index}`}>
                      <TableCell>{route.number}</TableCell>
                      <TableCell>{route.direction}</TableCell>
                      <TableCell>{route.schedule.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
