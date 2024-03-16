import { useWalletAddress } from "@etherspot/transaction-kit";
import { Box, LinearProgress, Typography } from "@mui/joy";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinearGradient } from "react-text-gradients";
import doneAnimation from "../../assets/lottie/done.json";

export default function CHeck() {
  const sepoliaAddress = useWalletAddress("etherspot-prime", 80001);
  const navigate = useNavigate();

  useEffect(() => {
    if (sepoliaAddress) {
      setTimeout(() => {
        navigate("/app/browse");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sepoliaAddress]);

  return (
    <Box>
      <Typography level="title-lg" textAlign={"center"} marginY={5}>
        Fetching your Account Abstraction wallet from Etherspot...
      </Typography>

      {sepoliaAddress && (
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
              {sepoliaAddress}
            </LinearGradient>
          </Typography>
        </Box>
      )}

      <LinearProgress />
    </Box>
  );
}
