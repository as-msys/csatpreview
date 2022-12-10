import * as React from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import apiList from "../../apiRoutes/apiNames";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardHeaderDesign from "../../src/components/CardHeader";
import { useRouter } from "next/router";

const Accounts = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiList[0]}?populate=%2A`
  );
  if (error)
    return (
      <Typography variant="sx={{ m: 2 }}h2">"An error has occured"</Typography>
    );
  if (!data) return <Typography variant="h4">"Loading..."</Typography>;

  //To remove the original paddings in the bottom
  const CardContentStyled = styled(CardContent)({
    //MuiCardContent-root:last-child
    "&.MuiCardContent-root:last-child": {
      paddingBottom: "14px",
    },
  });

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="titleVariant">Accounts</Typography>
      <Grid container rowSpacing={2} columnSpacing={2} padding={2}>
        {data.data.map((client) => (
          <Grid item md={3} key={client.id}>
            <Card
              variant="outlined"
              sx={{
                bgcolor: "#f5f5f5",
                border: "none",
                borderRadius: "3px",
              }}
            >
              <CardHeaderDesign
                clientName={client.attributes.name}
                pmName={client.attributes.delivery_head.data.attributes.name}
              />
              <CardContentStyled
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="countVariant" sx={{ mt: 1.5 }}>
                  {client.attributes.projects.data.length} Project(s)
                </Typography>

                <Button
                  size="large"
                  sx={{ fontWeight: 700, color: "#FF4081" }}
                  onClick={() =>
                    router.push(`/Accounts/${client.attributes.name}`)
                  }
                >
                  View
                </Button>
              </CardContentStyled>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Accounts;
