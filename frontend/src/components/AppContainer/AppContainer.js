import { EtherspotTransactionKit } from "@etherspot/transaction-kit";
import * as ethers from "ethers";
import { Outlet } from "react-router-dom";
import stringToMnemonic from "../../services/stringToMnemonic";

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
      <Outlet />
    </EtherspotTransactionKit>
  );
}
