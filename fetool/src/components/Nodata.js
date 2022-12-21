import React from "react";
import Image from "next/image";
import noData from "../assets/NoData.png";
import { Link, Typography } from "@mui/material";

const Nodata = () => {
  return (
    <>
      <Image src={noData} alt="nodata" className="NodataImg" />
      <Typography variant="subtitle1" sx={{ color: "#757575", mt: 43, ml: 40 }}>
        There are no pending surveys for this month.To view all surveys, please
        go to{" "}
        <Link
          color="secondary"
          href="/surveys"
          style={{ textDecoration: "none" }}
        >
          Surveys.{" "}
        </Link>
      </Typography>
    </>
  );
};

export default Nodata;
