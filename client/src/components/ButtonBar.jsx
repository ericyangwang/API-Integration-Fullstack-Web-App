import { React, useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import axios from 'axios';

const ButtonBar = ({lang, setLang, joke, setJoke, setJokeTsl}) => {

  // sourceLangs not used, however may be used in the future
  const [sourceLangs, setSourceLangs] = useState("");
  const [targetLangs, setTargetLangs] = useState("");

  // Fetch a new joke with the jokeapi endpoint
  const fetchJoke = async () => {
    try {
      const response = await axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
      setJoke(response.data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  // Call local backend API for translate request
  const translateJoke = async (joke, targetLang, sourceLang = null) => {
    if (joke.error === true) return;

    let jokeType = joke.type;
    let jokeSetup = jokeType === "single" ? joke.joke : joke.setup;
    let jokeDelivery = jokeType === "twopart" ? joke.delivery : "";

    try {
      if (jokeType === "single") {
        const url = sourceLang === null ? `/api/translate?text=${jokeSetup}&to=${targetLang}` : `/api/translate?text=${jokeSetup}&to=${targetLang}&from=${sourceLang}`;
        const response = await axios.get(url);
        const resTsl = {
          "error" : (response.data.error !== undefined),
          "type" : jokeType,
          "joke" : response.data.text,
        };
        setJokeTsl(resTsl);
      } else {
        const url1 = sourceLang === null ? `/api/translate?text=${jokeSetup}&to=${targetLang}` : `/api/translate?text=${jokeSetup}&to=${targetLang}&from=${sourceLang}`;
        const response1 = await axios.get(url1);
        const url2 = sourceLang === null ? `/api/translate?text=${jokeDelivery}&to=${targetLang}` : `/api/translate?text=${jokeDelivery}&to=${targetLang}&from=${sourceLang}`;
        const response2 = await axios.get(url2);
        const resTsl = {
          "error" : (response1.data.error !== undefined || response2.data.error !== undefined),
          "type" : jokeType,
          "setup" : response1.data.text,
          "delivery" : response2.data.text,
        };
        setJokeTsl(resTsl);
      }
    } catch (error) {
      console.error("Error translating joke:", error);
    }
  };

  // Local backend API for source language map
  const fetchSourceLangs = async () => {
    try {
      const response = await axios.get("/api/source-langs");
      setSourceLangs(response.data);
    } catch (error) {
      console.error("Error fetching source languages:", error);
    }
  };

  // Local backend API for target language map
  const fetchTargetLangs = async () => {
    try {
      const response = await axios.get("/api/target-langs");
      setTargetLangs(response.data);
    } catch (error) {
      console.error("Error fetching target languages:", error);
    }
  };

  useEffect(() => {
    fetchJoke();
    fetchSourceLangs();
    fetchTargetLangs();

    // eslint-disable-next-line
  }, []);

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        variant="contained"
        color="success"
        onClick={() => fetchJoke()}
      >
        Fetch Joke
      </Button>
      <Button
        variant="contained"
        onClick={() => translateJoke(joke, lang)}
      >
        Translate
      </Button>
      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel id="translate-lang-select-label">Language</InputLabel>
        <Select
          labelId="translate-lang-select-label"
          id="translate-lang-select"
          value={lang}
          label="Language"
          onChange={(e) => setLang(e.target.value)}
        >
          {Array.from(Object.keys(targetLangs)).map((langName) => (
            <MenuItem value={targetLangs[langName]}>{langName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
};

export default ButtonBar;