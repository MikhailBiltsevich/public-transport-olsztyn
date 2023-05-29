import {
  Box,
  Chip,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPlanedDeparturesFullInfo } from "~/shared/api.server";
import ErrorBoundaryDefault from "~/shared/error-boundary";
import type { PlanedDepartures } from "~/shared/types";

type Stop = PlanedDepartures["stop"];
type Day = Stop["day"][0];
type Route = Day["r"][0];
type Schedule = Route["s"][0];

export function ErrorBoundary() {
  return <ErrorBoundaryDefault />;
}

export async function loader({ params }: LoaderArgs) {
  if (!params.stopId || Number.isNaN(+params.stopId)) {
    throw new Response("Bad request", { status: 400 });
  }

  const planedDepartures = await getPlanedDeparturesFullInfo(params.stopId);
  return json(planedDepartures);
}

type Props = {
  currentTime: string;
  schedules: Schedule[];
};
function RoutePlanedDepartures({ currentTime, schedules }: Props) {
  return (
    <Box>
      <Stack p={2} gap={2} direction="row" flexWrap="wrap">
        {schedules.map((schedule) => {
          const time = `${schedule.th}:${schedule.tm}`;
          const isNextDeparture = time >= currentTime;
          const variant = isNextDeparture ? "filled" : "outlined";
          return <Chip variant={variant} key={schedule.uid} label={time} />;
        })}
      </Stack>
    </Box>
  );
}

export default function Index() {
  const [activeDay, setActiveDay] = useState<Day>();
  const [activeRoute, setActiveRoute] = useState<Route>();

  const planedDepartures: PlanedDepartures = useLoaderData();
  if (!planedDepartures) {
    return null;
  }

  const handleActiveDayChange = (
    event: React.SyntheticEvent,
    newValue: Day
  ) => {
    setActiveDay(newValue);
    setActiveRoute((activeRoute) =>
      newValue.r.find((route) => route.nr === activeRoute?.nr)
    );
  };

  const handleActiveRouteChange = (
    event: React.SyntheticEvent,
    newValue: Route
  ) => {
    setActiveRoute(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
      <Stack spacing={2}>
        <Paper>
          <Stack spacing={1}>
            <Stack p={2} direction="row" justifyContent="space-between">
              <Typography>{planedDepartures.stop.name}</Typography>
              <Typography>{planedDepartures.time}</Typography>
            </Stack>
            <Tabs value={activeDay} onChange={handleActiveDayChange}>
              {planedDepartures.stop.day.map((day) => (
                <Tab key={day.type} label={day.desc} value={day} />
              ))}
            </Tabs>
            {activeDay && (
              <Tabs value={activeRoute} onChange={handleActiveRouteChange}>
                {activeDay &&
                  activeDay.r.map((route: Route) => (
                    <Tab key={route.nr} label={route.nr} value={route} />
                  ))}
              </Tabs>
            )}
            {activeRoute && (
              <RoutePlanedDepartures
                currentTime={planedDepartures.time}
                schedules={activeRoute.s}
              />
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
