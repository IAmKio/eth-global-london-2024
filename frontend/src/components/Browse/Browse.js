import {
  Box,
  Card,
  Divider,
  Grid,
  Input,
  LinearProgress,
  Typography,
} from "@mui/joy";
import React from "react";
import Identicon from "react-hooks-identicons";
import { Link } from "react-router-dom";
import { useGetAllJarsQuery } from "../../services/api";

export default function Browse() {
  const { data: allJarsData, isLoading, isFetching } = useGetAllJarsQuery();
  const [search, setsearch] = React.useState("");

  return (
    <Box>
      <Input
        onChange={(e) => setsearch(e.target.value)}
        placeholder="Search for a profile..."
        size="lg"
        fullWidth
      />

      {isLoading || isFetching ? (
        <LinearProgress />
      ) : (
        <Box>
          <Box my={2}>
            <Divider>Profiles</Divider>
          </Box>
          <Grid container spacing={2}>
            {allJarsData
              .filter((v) => v.handle.search(search) > -1)
              .map((jar) => (
                <Grid xs={6} key={jar.handle}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/app/browse/${jar.handle}`}
                  >
                    <Card sx={{ cursor: "pointer" }}>
                      <Typography
                        startDecorator={
                          <Identicon size={25} string={jar.handle} />
                        }
                      >
                        {jar.handle}
                      </Typography>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
