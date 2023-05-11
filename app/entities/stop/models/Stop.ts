import type { Route } from "~/entities/route/models/Route";

export type Stop = {
  id: string;
  name: string;
  uwg: string;
  x: string;
  y: string;
  routes: Route[];
  number?: string;
  street?: string;
};
