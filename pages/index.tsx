import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";
import getResorts from "../lib/getResorts";
import useDebounce from "../util/useDebounce";
import { MAX_RESORTS_DISPLAY } from "../constants";

const Canvas = dynamic(() => import("../components/Canvas"), { ssr: false });

export default function Page({
  resortsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const countries: string[] = Array.from(
    new Set(resortsData.map((r: Resort) => r.country))
  );

  const [query, setQuery] = useState("france");
  const [resorts, setResorts] = useState<Resort[]>([]);
  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    const results = resortsData
      .filter((x: Resort) => {
        const _query = debouncedValue.toLowerCase();
        return (
          _query === x.country.toLowerCase() ||
          _query === x.continent.toLowerCase()
        );
      })
      .sort((a: Resort, b: Resort) => b.score - a.score)
      .slice(0, MAX_RESORTS_DISPLAY);
    setResorts(results);
  }, [debouncedValue, resortsData]);

  return (
    <div>
      <Head>
        <title>Let’s Ski!</title>
      </Head>
      <main>
        <div className="bar">
          <header>
            <h1>Let’s Ski!</h1>
          </header>
          <label htmlFor="search-field">
            Search for ski resorts by country or continent:
          </label>
          <input
            id="search-field"
            type="search"
            placeholder="e.g. ”Italy“ or “Val Thorens”"
            list="resorts"
            onInput={(evt: ChangeEvent<HTMLInputElement>) => {
              setQuery(evt.target.value);
            }}
          />
          <datalist id="resorts">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </datalist>
        </div>
        <Canvas resorts={resorts} />
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

export const getStaticProps: GetStaticProps = async () => {
  return { props: { resortsData: getResorts() } };
};
