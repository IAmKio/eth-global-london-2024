const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");

const { initFirebase } = require("./services/firebase");

const api = express();
initFirebase();

api.get("/", (req, res) =>
  res.json({
    message: "Hello from Token Tip @ ETH Global 🇬🇧 London Hackathon 2024!",
  })
);

exports.api = onRequest(api);
