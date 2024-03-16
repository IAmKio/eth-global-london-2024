import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/joy";
import { IDKitWidget } from "@worldcoin/idkit";
import Lottie from "lottie-react";
import { Outlet, useNavigate } from "react-router-dom";
import worldIdLogo from "../../assets/logos/worldcoin.png";
import passkeyAnimation from "../../assets/lottie/passkey.json";
import {
  createPasskey,
  deletePasskey,
  getPasskeyData,
} from "../../services/passkey";
import Intro from "../Intro/Intro";

export default function LoginContainer() {
  const navigate = useNavigate();

  const startGetPasskeyDataSequence = async () => {
    await getPasskeyData()
    .then(async (response) => {
      console.log(response);
      if (response) {
        navigate("/app/check");
      } else {
        await createPasskey();
        navigate("/app/check");
      }
    })
    .catch(async (e) => {
      console.warn(
        "Could not get existing passkey, trying to create a new one:",
        e.message
      );
      const r = await createPasskey();
      return r;
    });
  };

  const startDeletePasskeySequence = async () => {
    const decision = window.confirm(
      "Are you sure you want to delete your passkey? You will also lose access to any funds on your profile..."
    );
    if (decision) {
      await deletePasskey();
      window.location.reload();
    }
  };

  const startWorldIdSignout = async () => {
    const decision = window.confirm(
      "Are you sure you want to sign out of World ID?"
    );
    if (decision) {
      localStorage.removeItem("credential");
      localStorage.removeItem("uid");
      localStorage.removeItem("loginProvider");

      window.location.reload();
    }
  };

  const handleVerify = async (proof) => {
    console.log(proof);
    const res = await fetch(
      `${process.env.REACT_APP_API_HOSTNAME}/token-tip-me/us-central1/api/worldcoin/verify?appId=${process.env.REACT_APP_WORLDCOIN_APP_ID}&actionId=sign-in`,
      {
        // route to your backend will depend on implementation
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      }
    );
    if (!res.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  return (
    <Grid container>
      <Grid xs={0} md={3}></Grid>
      <Grid xs={12} md={6}>
        <Card>
          <Typography level="h1" textAlign={"center"}>
            TokenTip
          </Typography>

          <Intro />

          <Card>
            <Grid container>
              <Grid xs={12}>
                <Box
                  marginY={3}
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Avatar
                    sx={{ height: 80, width: 80 }}
                    alt="World ID"
                    src={worldIdLogo}
                  />
                </Box>
              </Grid>
              <Grid xs={12}>
                <IDKitWidget
                  app_id={process.env.REACT_APP_WORLDCOIN_APP_ID} // obtained from the Developer Portal
                  action="sign-in" // obtained from the Developer Portal
                  onSuccess={(proof) => {
                    localStorage.setItem("loginProvider", "worldcoin");
                    localStorage.setItem("credential", proof.nullifier_hash);
                    localStorage.setItem("uid", proof.nullifier_hash);
                    navigate("/app/check");
                  }} // callback when the modal is closed
                  handleVerify={handleVerify} // callback when the proof is received
                >
                  {({ open }) => (
                    // This is the button that will open the IDKit modal
                    <Button onClick={open} fullWidth>
                      Verify with World ID
                    </Button>
                  )}
                </IDKitWidget>

                <Typography
                  color="danger"
                  level="body-sm"
                  textAlign={"center"}
                  mt={2}
                  sx={{ cursor: "pointer" }}
                  onClick={() => startWorldIdSignout()}
                >
                  Sign out of World ID
                </Typography>
              </Grid>
            </Grid>
          </Card>

          <Card>
            <Grid container>
              <Grid xs={12}>
                <Lottie
                  onClick={() => startGetPasskeyDataSequence()}
                  style={{
                    height: 150,
                  }}
                  animationData={passkeyAnimation}
                  loop={false}
                />
              </Grid>
              <Grid xs={12}>
                <Button fullWidth onClick={() => startGetPasskeyDataSequence()}>
                  Sign in with Passkey
                </Button>
                <Typography
                  color="danger"
                  level="body-sm"
                  textAlign={"center"}
                  mt={2}
                  sx={{ cursor: "pointer" }}
                  onClick={() => startDeletePasskeySequence()}
                >
                  Remove passkey
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Outlet />
        </Card>
      </Grid>
      <Grid xs={0} md={3}></Grid>
    </Grid>
  );
}
