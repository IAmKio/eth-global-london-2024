import { useWalletAddress } from "@etherspot/transaction-kit";
import { Box, LinearProgress, Typography } from "@mui/joy";
import { useEffect } from "react";

export default function CHeck() {
  const sepoliaAddress = useWalletAddress("etherspot-prime", 80001);

  useEffect(() => {
    if (sepoliaAddress) {
      setTimeout(() => {
        window.location.href = "/app/profile";
      }, 3000);
    }
  }, [sepoliaAddress]);

  return (
    <Box>
      <Typography level="title-lg" textAlign={"center"} marginBottom={5}>
        Checking your profile...
      </Typography>
      <Typography
        textAlign={"center"}
        fontFamily={"monospace"}
        marginBottom={5}
      >
        {sepoliaAddress}
      </Typography>

      <LinearProgress />
    </Box>
  );
}
