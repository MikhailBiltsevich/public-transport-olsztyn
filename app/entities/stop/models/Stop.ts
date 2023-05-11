export type Stop = {
  id: string;
  name: string;
  uwg: string;
  x: string;
  y: string;
  routes: Record<"name" | "type", string>[];
  number?: string;
  street?: string;
};
