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
    <>
      <Head>
        <title>Let’s Ski!</title>
        <meta
          name="description"
          content="A ski lover’s experiment in creative coding and big data parsing."
        />
      </Head>
      <main>
        <header>
          <div>
            <h1>Let’s Ski!</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="search-field">
                  Search for the top 10 ski resorts by country or continent:
                </label>
                <input
                  id="search-field"
                  type="search"
                  placeholder="e.g. France, Asia..."
                  list="resorts"
                  onInput={(evt: ChangeEvent<HTMLInputElement>) => {
                    evt.preventDefault();
                    setQuery(evt.target.value);
                  }}
                />
              </div>
              <div>
                <input type="checkbox" id="show-details" name="show-details" />
                <label htmlFor="show-details">Show resorts’ details</label>
              </div>
            </form>
          </div>
        </header>
        <Canvas resorts={resorts} />
        <footer className="credit">
          <p>
            By <a href="https://github.com/roeybiran">Roey Biran</a> and May
            Rosner
          </p>
        </footer>
      </main>
      <datalist id="resorts">
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </datalist>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { resortsData: getResorts() } };
};
