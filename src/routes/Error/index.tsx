import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router";
import { Box, Container } from "@mui/material";

const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      console.log(error);
    }

    return (
      <Box width={1} height={1}>
        <Container maxWidth={"md"}>
          <h1>Oops! {error.status}</h1>
          <p>{error.statusText}</p>
          {error.data?.message && (
            <p>
              <i>{error.data.message}</i>
            </p>
          )}
        </Container>
      </Box>
    );
  } else if (error instanceof Error) {
    return (
      <Box width={1} height={1}>
        <Container maxWidth={"md"}>
          <h1>Oops! Unexpected Error</h1>
          <p>Something went wrong.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </Container>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default ErrorBoundary;
