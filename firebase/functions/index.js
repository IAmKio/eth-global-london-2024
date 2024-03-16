const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");

const { read, add, readAll, readByHandle } = require("./controllers/jars");
const { worldcoinVerify } = require("./controllers/worldcoin");

const { verifyAuth } = require("./middleware/auth");
const { initFirebase } = require("./services/firebase");

const api = express();
initFirebase();

api.get("/", (req, res) =>
  res.json({
    message: "Hello from Token Tip @ ETH Global 🇬🇧 London Hackathon 2024!",
  })
);

api.get("/jars/all", readAll);
api.get("/jars/handle/:handleId", readByHandle);
api.get("/jars", verifyAuth, read);
api.post("/jars", verifyAuth, add);

api.post("/worldcoin/verify", worldcoinVerify);

exports.api = onRequest(api);
