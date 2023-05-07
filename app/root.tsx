import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export async function loader() {
  return json({});
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Box>
          <AppBar position="sticky">
            <Toolbar>
              <Typography
                variant="h6"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Public Transport in Olsztyn
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </Box>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <CssBaseline />
      </body>
    </html>
  );
}
