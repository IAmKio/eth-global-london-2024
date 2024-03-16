import {
  EtherspotBatch,
  EtherspotBatches,
  EtherspotTransaction,
  useEtherspotBalances, useEtherspotPrices,
  useEtherspotTransactions,
  useEtherspotUtils,
} from '@etherspot/transaction-kit';
import SendIcon from "@mui/icons-material/Send";
import SubdirectoryArrowRight from "@mui/icons-material/SubdirectoryArrowRight";
import {
  Box, Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  Input,
  Modal,
  Typography,
} from '@mui/joy';
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Identicon from "react-hooks-identicons";
import { useParams } from "react-router-dom";
import sendAnimation from "../../assets/lottie/sent.json";
import { useGetJarsByIdQuery } from "../../services/api";
import { ethers } from 'ethers';

export default function Tip() {
  const { send, containsEstimatingError, containsSendingError } =
    useEtherspotTransactions();
  const balances = useEtherspotBalances(80001);
  const etherspotUtils = useEtherspotUtils();
  const [fetchedBalances, setFetchedBalances] = useState(null);
  const [sendValue, setSendValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [maticPrice, setMaticPrice] = useState(0);
  const params = useParams();
  const {
    data: jarsData,
    isLoading,
    isFetching,
  } = useGetJarsByIdQuery(params.id);
  const { getPrice } = useEtherspotPrices(137);

  useEffect(() => {
    const fetchMaticPrice = async () => {
      const price = await getPrice(ethers.constants.AddressZero);
      if (price) setMaticPrice(price.usd);
    };
    fetchMaticPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchedBalancesAction = async () => {
    const fetchedBalances = await balances.getAccountBalances(undefined, 80001);
    setFetchedBalances(fetchedBalances);
  };

  const onSendReceiver = (value) => {
    console.log("send receiver", value);
    setModalOpen(true);
    setSending(false);

    setTimeout(() => {
      setModalOpen(false);
    }, 3000);
  };

  useEffect(() => {
    fetchedBalancesAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (containsEstimatingError) {
      console.log("estimation error", containsEstimatingError);
    }
  }, [containsEstimatingError]);

  useEffect(() => {
    if (containsSendingError) {
      console.log("send error", containsSendingError);
    }
  }, [containsSendingError]);

  const updateSendValue = (value) => {
    if (isNaN(+value)) return;
    setSendValue(value);
  }

  return (
    <Box>
      <Modal open={modalOpen}>
        <Box>
          <Lottie
            style={{
              height: 300,
            }}
            animationData={sendAnimation}
            loop={false}
          />
          <Typography
            level="h1"
            textColor={"common.black"}
            textAlign={"center"}
          >
            Well, aren't you a kind soul?
          </Typography>
        </Box>
      </Modal>
      <Typography
        startDecorator={<Identicon size={25} string={params.id} />}
        level="title-lg"
      >
        {params.id}
      </Typography>
      {isLoading || isFetching ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography
            ml={1}
            mt={1}
            fontFamily={"monospace"}
            startDecorator={<SubdirectoryArrowRight />}
          >
            {jarsData.etherspotAddress}
          </Typography>

          <Box my={2}>
            <Divider>Your Account</Divider>
          </Box>
          <FormControl>
            <Typography>How much do you want to tip {params.id}?</Typography>
            <EtherspotBatches onSent={onSendReceiver}>
              <EtherspotBatch chainId={80001}>
                <EtherspotTransaction
                  to={jarsData.etherspotAddress}
                  value={sendValue}
                >
                  <Input
                    startDecorator={<Typography>MATIC</Typography>}
                    autoComplete="off"
                    placeholder="0.005"
                    size="lg"
                    fullWidth
                    onChange={(e) => updateSendValue(e.target.value)}
                    value={sendValue ?? ''}
                    endDecorator={
                      <IconButton
                        onClick={() => {
                          setSending(true);
                          send();
                        }}
                        variant="soft"
                        color="success"
                      >
                        {sending ? <CircularProgress /> : <SendIcon />}
                      </IconButton>
                    }
                  />
                  <Box sx={{ mt: 1, mb: 1 }}>
                    {[0.001, 1, 5, 25, 100].map((amountToAdd, index) => (
                      <Chip
                        key={`${index}-quick-add`}
                        onClick={() => updateSendValue(+(sendValue ?? 0) + amountToAdd)}
                      >
                        +{amountToAdd} MATIC
                      </Chip>
                    ))}
                  </Box>
                </EtherspotTransaction>
              </EtherspotBatch>
            </EtherspotBatches>
            <Typography level="body-sm">
              You currently have{" "}
              {fetchedBalances?.length &&
                etherspotUtils.parseBigNumber(fetchedBalances[0].balance)}{" "}
              in your Etherspot account
            </Typography>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}
