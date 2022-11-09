import "../styles/globals.css";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies  } from 'nookies'

function MyApp({ Component, pageProps,navigation }) {
  return (
    <>
      <ToastContainer autoClose={1000}/>
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

MyApp.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {}
  //Accessing cookies in NextJS from server side
  const jwt = parseCookies(ctx).jwt

  const res = await fetch(`http://localhost:1337/navigations`)
  const navigation = await res.json()

  if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
  }

  if (!jwt) {
      if (ctx.pathname === "/clients") {
        redirectUser(ctx, "/");
      }
  }

  return {
      pageProps,
      navigation
  }
}

export default MyApp;