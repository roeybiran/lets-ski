import { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import About from "../components/about";
import Header from "../components/header";
import ResortsInfo from "../components/resortsInfo";
import { MAX_RESORTS_DISPLAY } from "../constants";
import getResorts from "../lib/getResorts";
import useDebounce from "../util/useDebounce";

const MainCanvas = dynamic(() => import("../components/mainCanvas"), {
  ssr: false,
});
const Snowflakes = dynamic(() => import("../components/snowflakes"), {
  ssr: false,
});

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

  const initialResorts = resortsData.sort(
    (a: Resort, b: Resort) => b.score - a.score
  );

  useEffect(() => {
    // reduces jank when scrolling on mobile devices
    document.addEventListener("ontouchmove", (e) => e.preventDefault());

    if (!debouncedValue) {
      setResorts([]);
      return;
    }
    const results = initialResorts
      .filter((x: Resort) => {
        return (
          debouncedValue === x.country.toLowerCase() ||
          debouncedValue === x.continent.toLowerCase()
        );
      })
      .slice(0, MAX_RESORTS_DISPLAY);
    setResorts(results);
  }, [debouncedValue, initialResorts]);

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
        <ResortsInfo
          resorts={resorts}
          idToShow={shownDetails}
          didClose={() => setShownDetails("")}
        />

        {/* area3 */}
        <div>
          <MainCanvas
            resorts={
              resorts.length > 0
                ? resorts
                : initialResorts.slice(0, MAX_RESORTS_DISPLAY)
            }
          />
          {/* disclosure buttons */}
          <div>
            {resorts.map(({ name, id }) => (
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

        <Snowflakes />
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
