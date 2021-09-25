import Head from "next/head";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Canvas = dynamic(() => import("../components/Canvas"), { ssr: false });

export default function Page() {
  useEffect(() => {
    fetch("/api/search");
  });
  return (
    <div>
      <Head>
        <title>Let’s Ski!</title>
      </Head>
      <main>
        <header>
          <h1>Let’s Ski!</h1>
        </header>
        <p></p>
        <label htmlFor="search-field">
          Search for ski resorts by name, continent, country, city or area:
        </label>
        <input
          list="resorts"
          id="search-field"
          type="search"
          placeholder="e.g. ”Italy“ or “Val Thorens”"
        />
        <datalist id="resorts">
          <option value="france" />
        </datalist>
        <Canvas />
      </main>
      <footer>
        <p>
          By <a href="https://github.com/roeybiran">Roey Biran</a> and May
          Rosner
        </p>
      </footer>
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const resortsData = getAllResorts();
//   return { props: { resortsData } };
// };
// export const getServer
