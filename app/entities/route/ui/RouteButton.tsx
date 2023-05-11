import { DirectionsBus, Tram } from "@mui/icons-material";
import { Button } from "@mui/material";
import type { Route } from "../models/Route";

type Props = {
  route: Route;
};

export function RouteButton({ route }: Props) {
  const icon = route.type === "T" ? <Tram /> : <DirectionsBus />;

  return (
    <Button variant="outlined" key={route.name} startIcon={icon} size="small">
      {route.name}
    </Button>
  );
}
