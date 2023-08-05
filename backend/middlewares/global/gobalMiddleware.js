const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

const globalMiddleware = [
  morgan("dev"),
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  express.static(path.join(__dirname, "../../public")),
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 },
    // cookie: { secure: true },
  }),
  passport.initialize(),
  passport.session(),
];

module.exports = globalMiddleware;
