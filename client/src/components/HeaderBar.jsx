import { React } from 'react';
import { AppBar, Button, IconButton, Stack, styled, Toolbar, Tooltip, Typography } from '@mui/material';
import { DarkMode, LightMode, LinkedIn, GitHub } from '@mui/icons-material';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: 10,
  paddingBottom: 10,
});

const HeaderBar = ({mode, setMode}) => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Tooltip title="Toggle Theme">
          <IconButton
            sx={{ height: 40, display: mode === "light" ? "block" : "none" }}
            onClick={() => setMode("dark")}
          >
            <DarkMode />
          </IconButton>
          <IconButton
            sx={{ height: 40, display: mode === "light" ? "none" : "block" }}
            onClick={() => setMode("light")}
          >
            <LightMode />
          </IconButton>
        </Tooltip>

        <Typography variant="h4">
          Joke's On You!
        </Typography>

        <Stack spacing={0}>
          <Button
            color="secondary"
            startIcon={<LinkedIn />}
            href="https://www.linkedin.com/in/ericyw"
            target="_blank"
            rel="noopener"
          >
            <Typography variant="p" sx={{ display: { xs: "none", sm: "block" } }}>
              ericyw
            </Typography>
          </Button>
          <Button
            color="secondary"
            startIcon={<GitHub />}
            href="https://github.com/ericyangwang"
            target="_blank"
            rel="noopener"
          >
            <Typography variant="p" sx={{ display: { xs: "none", sm: "block" } }}>
              ericyangwang
            </Typography>
          </Button>
        </Stack>
      </StyledToolbar>
    </AppBar>
  )
};

export default HeaderBar;