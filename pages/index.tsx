import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";
import getResorts from "../lib/getResorts";
import useDebounce from "../util/useDebounce";
import { MAX_RESORTS_DISPLAY } from "../constants";
import About from "../components/about";
import ResortsInfo from "../components/resortsInfo";
import Header from "../components/header";

const Canvas = dynamic(() => import("../components/canvas"), { ssr: false });

export default function Page({
  resortsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const countries: string[] = Array.from(
    new Set(resortsData.map((r: Resort) => r.country))
  );

  const [query, setQuery] = useState("");
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [shownDetails, setShownDetails] = useState("");
  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    console.log("effect");

    if (!debouncedValue) {
      setResorts([]);
      return;
    }
    const results = resortsData
      .filter((x: Resort) => {
        return (
          debouncedValue === x.country.toLowerCase() ||
          debouncedValue === x.continent.toLowerCase()
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
        {/* area1 */}
        <div className="flow">
          <header className="center">
            <Header
              countries={countries}
              onInput={(q) => {
                setQuery(q);
              }}
            />
          </header>
          {resorts.length === 0 && (
            <p className="center fadein">
              {debouncedValue
                ? "No results! Try a different term."
                : "Type in the search field to find the top 10 ski resorts, by country or continent…"}
            </p>
          )}
        </div>

        {/* area2 */}
        <div className="resorts-info">
          <ResortsInfo
            resorts={resorts}
            idToShow={shownDetails}
            didClose={() => setShownDetails("")}
          />
        </div>

        {/* area3 */}
        <div className="content">
          <Canvas resorts={resorts} />
          {/* disclosure buttons */}
          <div>
            {resorts.map(({ name, id }, idx) => (
              <button
                aria-label="More information"
                key={name + id}
                type="button"
                className="disclosure fadein"
                id={`resort-button-${name + id}`}
                onClick={() => {
                  setShownDetails(String(id));
                }}
              >
                ⓘ
              </button>
            ))}
            <style jsx>{`
              .disclosure {
                position: absolute;
                background: none;
                border: none;
                cursor: pointer;
                color: var(--blue);
                font-size: 1rem;
                font-weight: 700;
                transform: translate(-50%, -150%);
              }
            `}</style>
          </div>
        </div>
      </main>

      <footer>
        <About />
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { resortsData: getResorts() } };
};
