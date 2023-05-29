import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export default function ErrorBoundaryDefault() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Box p={2}>
        <Alert variant="outlined" severity="error">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            {error.status} {error.statusText}
          </AlertTitle>
          <Typography>{error.data}</Typography>
        </Alert>
      </Box>
    );
  } else if (error instanceof Error) {
    return (
      <Alert variant="outlined" severity="error">
        {error.message}
      </Alert>
    );
  } else {
    return (
      <Alert variant="outlined" severity="error">
        Unknown Error
      </Alert>
    );
  }
}
