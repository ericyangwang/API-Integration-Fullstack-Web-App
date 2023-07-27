import express from "express";
import path from "path";
import DeepL from "./deepl-translate.js";

// ES6 Module workaround for __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

// Endpoint for translation requests
app.get("/api/translate", async (req, res) => {
  let translation = await DeepL.translate(req.query.text, req.query.from, req.query.to);
  res.json(translation);
});

// Endpoint for getting source language list
app.get("/api/source-langs", async (req, res) => {
  let sourceLangs = await DeepL.getSourceLangs();
  res.json(sourceLangs);
});

// Endpoint for getting target language list
app.get("/api/target-langs", async (req, res) => {
  let targetLangs = await DeepL.getTargetLangs();
  res.json(targetLangs);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});