import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/components/theme";
import Layout from "../src/components/Layout/sidebar";
import { SWRConfig } from "swr";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

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
function redirectUser(ctx, location) {
  if (ctx.req) {
    //302-Resource requested has been temporarily moved to the URL given by the Location header.
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    router.push(location);
  }
}
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}; //Accessing cookies in NextJS from server side
  const jwt = parseCookies(ctx).jwt;
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  } //Directed to AccountsData page only if jwt token is valid
  if (!jwt) {
    if (ctx.pathname.includes(`/Accounts`)) {
      redirectUser(ctx, "/");
    }
  }
  return {
    pageProps,
  };
};

export default MyApp;
