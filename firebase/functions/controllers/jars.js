const { getFirestore } = require("firebase-admin/firestore");

const read = async (req, res) => {
  const db = getFirestore();
  let ref;

  if (req.query.handle) {
    console.log("handle", req.query.handle);
    ref = db.collection("jars").where("handle", "==", req.query.handle);
  } else {
    ref = db.collection("jars").doc(req.uid);
  }

  const docs = await ref.get();

  if (docs.size === 0) {
    return res.json([]);
  } else {
    return res.json(docs.data());
  }
};

const readByHandle = async (req, res) => {
  const db = getFirestore();
  let ref;

  if (req.params.handleId) {
    console.log("handle", req.params.handleId);
    ref = db.collection("jars").where("handle", "==", req.params.handleId);
  } else {
    return res.status(400).json({ status: "Invalid or no handle" });
  }

  const docs = await ref.get();

  if (docs.size === 0) {
    return res.json([]);
  } else {
    return res.json(docs.docs[0].data());
  }
};

const readAll = async (req, res) => {
  const db = getFirestore();
  const allDocs = await db.collection("jars").get();

  if (allDocs.empty) {
    return res.json([]);
  } else {
    return res.json(allDocs.docs.map((doc) => doc.data()));
  }
};

const add = async (req, res) => {
  console.log(req.body);
  const db = getFirestore();
  /**
   * First check if the username is taken
   */
  const docs = await db
    .collection("jars")
    .where("handle", "==", req.body.handle)
    .get();

  if (docs.empty) {
    await db.collection("jars").doc(req.uid).set(req.body, { merge: true });
    return res.json({ status: "OK" });
  } else {
    return res.status(409).json({ status: "Username taken" });
  }
};

module.exports = {
  readByHandle,
  readAll,
  read,
  add,
};
