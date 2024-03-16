import { Box, Card, Grid, Link, Typography } from "@mui/joy";
import Lottie from "lottie-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import passkeyAnimation from "../../assets/lottie/passkey.json";
import {
  createPasskey,
  deletePasskey,
  getPasskeyData,
} from "../../services/passkey";

export default function LoginContainer() {
  const location = useLocation();
  const navigate = useNavigate();

  const credential = localStorage.getItem("credential");

  const startCreatePasskeySequence = async () => {
    const passkeyData = await createPasskey().then((res) => {
      navigate("/app/check");
    });
    console.log("Passkey created", passkeyData);
  };

  const startGetPasskeyDataSequence = async () => {
    const passkeyData = await getPasskeyData().then((res) => {
      navigate("/app/check");
    });
    console.log("Passkey fetch data", passkeyData);
  };

  const startDeletePasskeySequence = async () => {
    await deletePasskey();
    window.location.reload();
  };

  return (
    <Grid container>
      <Grid xs={0} md={3}></Grid>
      <Grid xs={12} md={6}>
        <Card>
          <Typography level="title-lg" textAlign={"center"}>
            TokenTip
          </Typography>

          {credential && location.pathname === "/" ? (
            <Box>
              <Card variant="soft" color="success">
                <Typography textAlign={"center"}>
                  You already have a passkey, would you like to{" "}
                  <Link onClick={() => startGetPasskeyDataSequence()}>
                    sign in
                  </Link>{" "}
                  or{" "}
                  <Link onClick={() => startDeletePasskeySequence()}>
                    remove
                  </Link>{" "}
                  the passkey?
                </Typography>
              </Card>
              <Lottie
                style={{
                  height: 300,
                }}
                animationData={passkeyAnimation}
                loop={false}
              />
            </Box>
          ) : (
            <Box>
              <Typography textAlign={"center"}>Please sign in first</Typography>
              <Lottie
                onClick={() => startCreatePasskeySequence()}
                style={{
                  height: 300,
                }}
                animationData={passkeyAnimation}
                loop={false}
              />
            </Box>
          )}
          <Outlet />
        </Card>
      </Grid>
      <Grid xs={0} md={3}></Grid>
    </Grid>
  );
}
