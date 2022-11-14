import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Component {...pageProps} />
    </>
  );
}

function redirectUser(ctx, location) {
  if (ctx.req) {
    //302-Resource requested has been temporarily moved to the URL given by the Location header.
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  //Accessing cookies in NextJS from server side
  const jwt = parseCookies(ctx).jwt;

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!jwt) {
    if (ctx.pathname === "/clients") {
      redirectUser(ctx, "/");
    }
  }

  return {
    pageProps,
  };
};

export default MyApp;
