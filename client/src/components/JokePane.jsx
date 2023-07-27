import React from 'react';
import { Alert, Paper, Stack, styled, Typography } from '@mui/material'

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  padding: "20px",
  backgroundColor: theme.palette.action.disabledBackground,
}));

const JokePane = ({joke}) => {
  let reqError = joke.error;
  let jokeType = joke.type;
  let jokeSetup = jokeType === "single" ? joke.joke : joke.setup;
  let jokeDelivery = jokeType === "twopart" ? joke.delivery : "";

  return (
    <Stack spacing={1} sx={{ width: "80%" }}>
      <StyledPaper>
        <Stack spacing={2}>
          <Typography
            variant="h1"
            sx={{ display: reqError === false ? "block" : "none" }}
          >
            {jokeSetup}
          </Typography>
          <Typography
            variant="h3"
            sx={{ display: reqError === false && jokeType === "twopart" ? "block" : "none" }}
          >
            {jokeDelivery}
          </Typography>
          <Typography
            variant="h3"
            color="error"
            sx={{ display: reqError === true ? "block" : "none" }}
          >
            Errors are red, screen is blue, I think I deleted, system32.
          </Typography>
        </Stack>
      </StyledPaper>
      <Alert severity="error" sx={{ display: reqError === true ? "block" : "none" }}>
        An error occurred while searching for a new joke!
      </Alert>
    </Stack>
  )
};

export default JokePane;