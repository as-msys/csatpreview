import Head from "next/head";
import Login from "../components/Login";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="heading">MSys</h1>
      </header>
      <Login />
      <footer>
        <div>
          <h2 className="heading">© MSys Technologies</h2>
        </div>
      </footer>
    </div>
  );
}