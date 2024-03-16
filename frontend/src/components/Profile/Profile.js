import {
  useEtherspotBalances,
  useEtherspotUtils,
  useWalletAddress,
} from "@etherspot/transaction-kit";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  LinearProgress,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import Identicon from "react-hooks-identicons";
import { useGetJarsQuery, useUpdateJarsMutation } from "../../services/api";

export default function Profile() {
  const etherspotUtils = useEtherspotUtils();
  const balances = useEtherspotBalances(process.env.REACT_APP_CHAIN_ID);
  const [fetchedBalance, setFetchedBalance] = useState(0);
  const { data: jarsData, isLoading, isFetching } = useGetJarsQuery();
  const [triggerSave, saveResult] = useUpdateJarsMutation();
  const [handle, setHandle] = React.useState("");
  const etherspotAddress = useWalletAddress("etherspot-prime", process.env.REACT_APP_CHAIN_ID);
  const [saving, setSaving] = React.useState(false);

  const fetchedBalancesAction = async () => {
    const fetchedBalances = await balances.getAccountBalances(undefined, process.env.REACT_APP_CHAIN_ID);
    setFetchedBalance(fetchedBalances);
  };

  React.useEffect(() => {
    if (jarsData) {
      setHandle(jarsData.handle);
      fetchedBalancesAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jarsData]);

  React.useEffect(() => {
    if (saveResult.isSuccess) {
      setSaving(false);
    }

    if (saveResult.isError) {
      setSaving(false);
      alert(saveResult.error.data.status);
    }
  }, [saveResult]);

  const saveFormData = (e) => {
    e.preventDefault();
    console.log("saving...");
    setSaving(true);

    triggerSave({
      handle,
      etherspotAddress,
    });
  };

  return (
    <Box>
      {isLoading || isFetching ? (
        <LinearProgress />
      ) : (
        <Box>
          <form onSubmit={saveFormData}>
            <FormControl>
              <Typography gutterBottom>Set your TokenTip handle</Typography>
              <Input
                startDecorator={<Identicon size={25} string={handle} />}
                placeholder="cryptolover123"
                type="text"
                size="lg"
                fullWidth
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                endDecorator={
                  <Button disabled={saving} onClick={saveFormData}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                }
              />
              <Typography
                mt={2}
                ml={3}
                fontFamily={"monospace"}
                startDecorator={<SubdirectoryArrowRightIcon />}
              >
                {etherspotAddress}
              </Typography>
            </FormControl>
          </form>
          <Box my={2}>
            <Divider>Your Account Balance</Divider>
          </Box>

          <Typography
            level="body-lg"
            fontFamily={"monospace"}
            textAlign={"center"}
          >
            {fetchedBalance
              ? etherspotUtils.parseBigNumber(fetchedBalance[0].balance)
              : 0}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
