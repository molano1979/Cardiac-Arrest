const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const strava = require('strava-v3')

strava.config({
  "access_token"  : process.env.STRAVA_ACCESS_TOKEN,
  "client_id"     : process.env.STRAVA_CLIENT_ID,
  "client_secret" : process.env.STRAVA_CLIENT_SECRET,
  "redirect_uri"  : process.env.STRAVA_REDIRECT_URI
});

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret:
    "It was a bright cold day in April and the clocks were striking thirteen",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Server is live"));
});
