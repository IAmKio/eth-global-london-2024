const { logger } = require("firebase-functions/v1");

const verifyAuth = async (request, response, next) => {
  logger.info("Verifying authentication...");

  const uid = request.headers["x-uid"];
  if (!uid) {
    return response.status(403).send("Unauthorized");
  } else {
    request.uid = uid;
    return next();
  }
};

module.exports = {
  verifyAuth,
};
