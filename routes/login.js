const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");
const axios = require('axios');
const cors = require('cors');

router.use(cors({ credentials: true, origin: true }));

const client_id = '80165';
const client_secret = '2764f929ad984d4e868fc35df2707530ca45d896';
const callbackuri = 'https://www.strava.com/oauth/mobile/authorize';

// set the strava callback url to call the oauth window to pop up
router.get("/oauth/redirect", withAuth, async (req, res) => {
  axios({
    method: 'post',
    url: `${callbackuri}?client_id=${client_id}&client_secret=${client_secret}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    }
  }).then((response) => {
    res.redirect(
      `http://localhost:3001?access_token=${response.data.access_token}`
    );
  });
});


module.exports = router;
