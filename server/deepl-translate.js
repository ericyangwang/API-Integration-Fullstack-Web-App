import * as deepl from "deepl-node";
import { readFile } from "fs/promises";

// Do not need to read from config.json if deployed on Heroku
// Use Heroku config variables instead
const { apiKey } = JSON.parse(
  await readFile(
    new URL("../config.json", import.meta.url)
  )
);
/* Uncomment this section and comment the section above if deploying on Heroku
const apiKey = process.env.DEEPL_API_KEY;
*/
const translator = new deepl.Translator(apiKey);

// Perform text translation
const translate = async (text, from, to) => {
  let result;
  try {
    result = await translator.translateText(text, from === undefined ? null : from, to);
  } catch (error) {
    result = { "error" : error.toString() };
    console.error("Error fetching translation:", error);
  }
  return result;
};

// Get translation source languages
const getSourceLangs = async () => {
  const langs = await translator.getSourceLanguages();
  let sourceLangs = {};
  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    sourceLangs[lang.name] = lang.code;
  }
  return sourceLangs;
};

// Get translation target languages
const getTargetLangs = async () => {
  const langs = await translator.getTargetLanguages();
  let targetLangs = {};
  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    targetLangs[lang.name] = lang.code;
  }
  return targetLangs;
};

export default { translate, getSourceLangs, getTargetLangs };