import { EtherspotTransactionKit } from "@etherspot/transaction-kit";
import {
  Box,
  Button,
  Card,
  Grid,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import * as ethers from "ethers";
import { Outlet, useNavigate } from "react-router-dom";
import stringToMnemonic from "../../services/stringToMnemonic";

export default function AppContainer() {
  const navigate = useNavigate();

  const wallet = ethers.Wallet.fromMnemonic(
    stringToMnemonic(localStorage.getItem("uid"))
  );
  const providerWallet = new ethers.Wallet(wallet.privateKey);

  return (
    <EtherspotTransactionKit
      projectKey={process.env.REACT_APP_ETHERSPOT_KEY}
      provider={providerWallet}
    >
      <Grid container>
        <Grid xs={0} md={3}></Grid>
        <Grid xs={12} md={6}>
          <Card>
            <Typography level="h1" textAlign={"center"}>
              TokenTip
            </Typography>

            <Box display={"flex"} justifyContent={"center"}>
              <ToggleButtonGroup>
                <Button onClick={() => navigate("/app/browse")} value="sm">
                  Browse
                </Button>
                <Button onClick={() => navigate("/app/profile")} value="md">
                  Profile
                </Button>
              </ToggleButtonGroup>
            </Box>
            <Outlet />
          </Card>
        </Grid>
        <Grid xs={0} md={3}></Grid>
      </Grid>
      <Grid container>
        <Grid xs={12}>
          <Typography level="body-sm" marginY={5} textAlign={"center"}>
            Built for ETH Global 🇬🇧 London Hackathon
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography
            onClick={() => navigate("/")}
            color="danger"
            level="body-sm"
            textAlign={"center"}
            sx={{ cursor: "pointer" }}
          >
            Back to sign in
          </Typography>
        </Grid>
      </Grid>
    </EtherspotTransactionKit>
  );
}
