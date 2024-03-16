import { EtherspotTransactionKit } from "@etherspot/transaction-kit";
import * as ethers from "ethers";
import { Outlet } from "react-router-dom";
import stringToMnemonic from "../../services/stringToMnemonic";
import { Card, Grid } from '@mui/joy';

export default function AppContainer() {
  const wallet = ethers.Wallet.fromMnemonic(
    stringToMnemonic(localStorage.getItem("uid"))
  );
  const providerWallet = new ethers.Wallet(wallet.privateKey);

  return (
    <EtherspotTransactionKit
      projectKey="public-prime-testnet-key"
      provider={providerWallet}
    >
      <Grid container>
        <Grid xs={0} md={3}></Grid>
        <Grid xs={12} md={6}>
          <Card>
            <Outlet />
          </Card>
        </Grid>
        <Grid xs={0} md={3}></Grid>
      </Grid>
    </EtherspotTransactionKit>
  );
}
