const { initializeApp } = require("firebase-admin/app");
const { logger } = require("firebase-functions/v1");

const initFirebase = () => {
  logger.info("Initializing Firebase...");
  initializeApp();
};

module.exports = {
  initFirebase,
};
