import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { RouteButton } from "~/entities/route/ui/RouteButton";
import type { Stop } from "../models/Stop";

export function StopCard({ stop }: Record<"stop", Stop>) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {stop.name}
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          {stop.number || stop.street}
        </Typography>

        <Stack useFlexGap spacing={2} flexWrap="wrap" direction="row">
          {stop.routes.map((route) => (
            <RouteButton key={route.name} route={route} />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button fullWidth size="small">
          Open
        </Button>
      </CardActions>
    </Card>
  );
}
