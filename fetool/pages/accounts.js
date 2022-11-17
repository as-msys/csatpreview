import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import useSWR from "swr";
import apiList from "../apiRoutes/apiNames";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Accounts = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?populate=%2A`,
    fetcher
  ); //(uniquekey,fetcher function)
  if (error)
    return <Typography variant="h2">"An error has occured"</Typography>;
  if (!data) return <Typography variant="h4">"Loading..."</Typography>;

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="myVariant" gutterBottom m={2}>
        Accounts
      </Typography>

      <Card variant="outlined" style={{ width: "30%", margin: "1rem" }}>
        <div style={{ display: "flex" }}>
          <Avatar alt="LL" style={{ margin: "1rem" }}>
            LL
          </Avatar>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Liquidware Labs
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              component="div"
              color="text.secondary"
            >
              Vinoth J
            </Typography>
          </CardContent>
        </div>
        <CardActions style={{ justifyContent: "space-between" }}>
          <Typography variant="body2">3 Project(s)</Typography>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Accounts;
