const fetch = require("node-fetch");

const worldcoinVerify = async (req, res) => {
  const verifyRes = await fetch(
    `https://developer.worldcoin.org/api/v1/verify/${req.query.appId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...req.body,
        action: req.query.actionId,
      }),
    }
  );

  if (verifyRes.ok) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    return res.status(verifyRes.status).send({
      code: "success",
      detail: "This action verified correctly!",
    });
  } else {
    console.log(verifyRes.body);
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    return res
      .status(verifyRes.status)
      .send({ code: verifyRes.code, detail: verifyRes.detail });
  }
};

module.exports = { worldcoinVerify };
