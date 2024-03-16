import { useWalletAddress } from "@etherspot/transaction-kit";
import { Box, LinearProgress, Typography } from "@mui/joy";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinearGradient } from "react-text-gradients";
import doneAnimation from "../../assets/lottie/done.json";

export default function CHeck() {
  const etherspotAddress = useWalletAddress("etherspot-prime", process.env.REACT_APP_CHAIN_ID);
  const navigate = useNavigate();

  useEffect(() => {
    if (etherspotAddress) {
      setTimeout(() => {
        navigate("/app/browse");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etherspotAddress]);

  return (
    <Box>
      <Typography level="title-lg" textAlign={"center"} marginY={5}>
        Fetching your Account Abstraction wallet from Etherspot...
      </Typography>

      {etherspotAddress && (
        <Box>
          <Lottie
            style={{
              height: 150,
            }}
            animationData={doneAnimation}
            loop={false}
          />

          <Typography
            textAlign={"center"}
            fontFamily={"monospace"}
            marginBottom={5}
            fontSize={20}
          >
            <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
              {etherspotAddress}
            </LinearGradient>
          </Typography>
        </Box>
      )}

      <LinearProgress />
    </Box>
  );
}
