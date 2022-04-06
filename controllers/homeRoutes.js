const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    res.render("body", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(`${err}`);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }

  res.render("signup");
});

router.get("/*", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }

  res.render("signup");
});

module.exports = router;
