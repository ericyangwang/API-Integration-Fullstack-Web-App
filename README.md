# Welcome to my Simple API Integration Demo Webapp

This project uses React and Node.js to build a simple webapp that integrates features from other APIs, specifically [JokeAPI](https://jokeapi.dev/) and the [DeepL API](https://www.deepl.com/en/docs-api).\
It also features a backend web server made with Express.js with API endpoints that the frontend uses to request for translations, set up so that the API key required for the DeepL API is securely hidden from users.\
The live version of this webapp is hosted on Heroku, and may be found [here](https://aview-coding-challenge-7e2217167345.herokuapp.com/).

## How to run the application locally

1. First clone this GitHub repository.
2. Go to the `config.json` file and input your DeepL API key (you will need a DeepL account for this).
3. Next, to start the backend server, run `npm start` in the root directory.
4. On a separate terminal, navigate to the `client` directory and run `npm start` again.
5. Go to [`http://localhost:3000/`](http://localhost:3000/), and enjoy the corny jokes!

## How to deploy the application using Heroku

1. First clone this GitHub repository.
2. Go to `/server/deepl-translate.js` file and follow the comments.
3. Ensure that the Heroku CLI is installed, then create a new app on Heroku.
4. Login to Heroku on the terminal using `heroku login`.
5. Run `heroku git:remote -a insert-your-app-name-here` (you may need to set up a new Git repo).
6. Add and commit the files, then `git push heroku master`.
7. Go to the Heroku link for the app once done deploying and enjoy!
