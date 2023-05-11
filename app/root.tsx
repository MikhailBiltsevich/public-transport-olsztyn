import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";

export async function loader() {
  return json({});
}

export default function App() {
  const { state: navState } = useNavigation();
  const isNavigationLoading = navState === "loading";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Box minHeight="100vh" sx={{ backgroundColor: grey[100] }}>
          <AppBar position="static">
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
          <Outlet />
        </Box>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <CssBaseline />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isNavigationLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </body>
    </html>
  );
}
