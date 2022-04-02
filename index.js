const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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

app.get("/oauth/token/:key", (nreq, nres) => {
  // we don't need to cache this API call 
  // it does not count against our limit
  // https://groups.google.com/d/msg/strava-api/yP8tV9KapZs/PH6lwK2b5gAJ

  if (nreq.params.key == app_key) {

    const baseUrl = nreq ? `${nreq.protocol}://${nreq.get('Host')}` : '';
    const auth_link = "https://www.strava.com/oauth/token"
    fetch(auth_link, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        refresh_token: process.env.refresh_token,
        grant_type: 'refresh_token'
      })
    }).then(res => res.json())
      .then(json => nres.json({ access_token: json.access_token }))
  } else {
    console.log('invalid key provided for oauth token request');
    nres.status(500).json({ error: 'invalid key provided for oauth token request' });
  }
});

app.get("/athlete/activities/:page", (nreq, nres) => {

  var page_id = nreq.params.page
  var key = '__express__' + nreq.originalUrl || nreq.url
  console.log(key);
  const cacheContent = cache.getKey(key);
  if (cacheContent) {
    console.log('sending cached copy of ' + key)
    nres.json(cacheContent);
  } else {
    const baseUrl = nreq ? `${nreq.protocol}://${nreq.get('Host')}` : '';
    access_token = fetch(baseUrl + "/oauth/token/" + app_key)
      .then(res => res.json())
      .then(function (json) {
        // console.log(json);
        const activities_link = `https://www.strava.com/api/v3/athlete/activities?per_page=60&access_token=${json.access_token}&after=${activity_since}&page=${page_id}`
        fetch(activities_link)
          .then((res) => res.json())
          .then(function (json) {
            jsonbody = json;
            cache.setKey(key, jsonbody);
            cache.save();
            console.log('saved copy of ' + key + ' to cache.');
            nres.json(jsonbody);
          });

      });
  }
});

app.get("/activities/:id", (nreq, nres) => {

  var activity_id = nreq.params.id
  var key2 = '__express__' + nreq.originalUrl || nreq.url
  console.log(key2);
  const cacheContent = cache.getKey(key2);
  if (cacheContent) {
    console.log('sending cached copy of ' + key2);
    nres.json(cacheContent);
  } else {
    const baseUrl = nreq ? `${nreq.protocol}://${nreq.get('Host')}` : '';
    access_token = fetch(baseUrl + "/oauth/token/" + app_key)
      .then(res => res.json())
      .then(function (json) {
        // console.log(json);
        const detail_link = 'https://www.strava.com/api/v3/activities/' + activity_id + '?include_all_efforts=true'
        var bearer = 'Bearer ' + json.access_token
        var headers = { 'Authorization': bearer, redirect: 'follow' }
        fetch(detail_link, { method: 'GET', headers: headers })
          .then((res) => res.json())
          .then(function (json) {
            jsonbody = json;
            cache.setKey(key2, jsonbody);
            cache.save();
            console.log('saved copy of ' + key2 + ' to cache.');
            nres.json(jsonbody);
          });

      });
  }
});

app.get("/app/ignore_activity", (nreq, nres) => {

  nres.status(200).json(process.env.ignore_activity);

});

app.get("/app/show_activity_types", (nreq, nres) => {

  nres.status(200).json(process.env.show_activity_types);

});

app.get("/cache/refresh/:key", (nreq, nres) => {

  if (nreq.params.key == app_key) {
    console.log('clearing cache');
    cache.remove();
    nres.status(200).json({ status: 'cache cleared' });
  } else {
    console.log('invalid key provided for clear cache command');
    nres.status(500).json({ error: 'invalid key provided for clear cache command' });
  }
});
