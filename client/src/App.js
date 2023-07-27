import { useState } from 'react';
import HeaderBar from "./components/HeaderBar";
import JokePane from "./components/JokePane";
import ButtonBar from "./components/ButtonBar";
import TranslatePane from "./components/TranslatePane";
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';

function App() {
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme ({
    palette: {
      mode: mode
    }
  });

  const [joke, setJoke] = useState("");
  const [jokeTsl, setJokeTsl] = useState("");
  const [lang, setLang] = useState("");

  return (
    <ThemeProvider theme={darkTheme}>
      <Box height="100vh" display="flex" flexDirection="column" >
        <Box bgcolor={"background.default"} color={"text.primary"} flex={1}>
          <HeaderBar mode={mode} setMode={setMode} />
          <Stack
            display="flex"
            spacing={5}
            alignItems="center"
            paddingTop={5}
            paddingBottom={5}
          >
            <JokePane joke={joke} />
            <ButtonBar lang={lang} setLang={setLang} joke={joke} setJoke={setJoke} setJokeTsl={setJokeTsl} />
            <TranslatePane jokeTsl={jokeTsl} />
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;