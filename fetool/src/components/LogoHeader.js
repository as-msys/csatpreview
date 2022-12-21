import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../assets/Group.png";

const LogoHeader = () => {
  const router = useRouter();
  return (
    <Box className={router.pathname === "/" ? "headerHome" : "header"}>
      <Image src={Logo} alt="Logo of the company" />
      <Typography
        variant={router.pathname === "/" ? "h4" : "h5"}
        style={{ marginLeft: "1rem" }}
      >
        <b>CSAT</b> Proto
      </Typography>
    </Box>
  );
};

export default LogoHeader;
