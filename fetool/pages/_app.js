import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/components/theme";
import Layout from "../src/components/Layout/sidebar";
import { SWRConfig } from "swr";
import axios from "axios";
import { parseCookies } from "nookies";

const fetcher = async (url, token) => {
  const response = await axios.get(url, {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data.data;
};

function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ToastContainer autoClose={3000} />
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
