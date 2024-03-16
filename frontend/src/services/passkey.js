import { decode, encode } from "base64-arraybuffer";
import * as chance from "chance";

const deletePasskey = async () => {
  localStorage.removeItem("credential");
  localStorage.removeItem("uid");
  localStorage.removeItem("loginProvider");

  console.log("Passkey data removed");
  return true;
};

const createPasskey = async () => {
  console.log("Create passkey");

  const name = `${chance
    .Chance()
    .name({ prefix: true })} @ ETH Global London 2024`;

  const createCredentialDefaultArgs = {
    publicKey: {
      // Relying Party (a.k.a. - Service):
      rp: {
        name: "Token Tip",
      },
      // User:
      user: {
        id: new TextEncoder().encode("thisisatestforpasskeys@gmail.com"),
        name: name,
        displayName: name,
      },
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7,
        },
      ],
      attestation: "direct",
      timeout: 60000,
      challenge: new Uint8Array(32).buffer,
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        requireResidentKey: true,
      },
    },
  };

  // register / create a new credential
  return navigator.credentials
    .create(createCredentialDefaultArgs)
    .then((cred) => {
      console.log("NEW CREDENTIAL", cred);
      localStorage.setItem("credential", encode(cred.rawId));
      localStorage.setItem("uid", cred.id);
      localStorage.setItem("loginProvider", "passkey");
      console.log("set CREDENTIAL", encode(cred.rawId));
      return true;
    })
    .catch((err) => {
      console.log("ERROR", err);
      return err;
    });
};

const getPasskeyData = async () => {
  console.log("Get passkey data");
  const passkeyCredential = localStorage.getItem("credential");
  if (!passkeyCredential) {
    throw new Error("No passkey found");
  }
  const fetchedCredential = decode(passkeyCredential);
  console.log("FETCHED CREDENTIAL", fetchedCredential);

  const getCredentialDefaultArgs = {
    publicKey: {
      timeout: 60000,
      challenge: new Uint8Array(32).buffer,
    },
  };

  const idList = [
    {
      id: fetchedCredential,
      transports: ["internal"],
      type: "public-key",
    },
  ];

  getCredentialDefaultArgs.publicKey.allowCredentials = idList;

  return navigator.credentials
    .get(getCredentialDefaultArgs)
    .then((creds) => {
      console.log("GET CREDS", creds);
      localStorage.setItem("uid", creds.id);
      localStorage.setItem("loginProvider", "passkey");
      return creds.id;
    })
    .catch((err) => {
      console.log("ERROR when fetching passkey", err);
      return err;
    });
};

export { createPasskey, deletePasskey, getPasskeyData };
