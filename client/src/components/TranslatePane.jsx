import React from 'react';
import { Alert, Paper, Stack, styled, Typography } from '@mui/material'

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  padding: "20px",
  backgroundColor: theme.palette.action.disabledBackground,
}));

const TranslatePane = ({jokeTsl}) => {
  let reqError = jokeTsl.error;
  let jokeType = jokeTsl.type;
  let jokeSetup = jokeType === "single" ? jokeTsl.joke : jokeTsl.setup;
  let jokeDelivery = jokeType === "twopart" ? jokeTsl.delivery : "";

  return (
    <Stack spacing={1} sx={{ width: "80%", display: jokeSetup ? "block" : "none" }}>
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
            You've found a hidden secret (not)!
          </Typography>
        </Stack>
      </StyledPaper>
      <Alert severity="error" sx={{ display: reqError === true ? "block" : "none" }}>
        An error occurred while translating your joke!
      </Alert>
    </Stack>
  )
};

export default TranslatePane;