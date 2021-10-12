import { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import About from "../components/About";
import Header from "../components/Header";
import ResortsInfo from "../components/ResortsInfo";
import { MAX_RESORTS_DISPLAY } from "../constants";
import getResorts from "../lib/getResorts";

const siteName = "Let’s Ski!";
const description =
  "A ski lover’s experiment in creative coding and big data parsing.";
const url = "https://lets-ski.roeybiran.com";

const MainScene = dynamic(() => import("../components/MainScene"), {
  ssr: false,
});
const SnowflakesScene = dynamic(() => import("../components/SnowflakesScene"), {
  ssr: false,
});

export default function Page({
  resortsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const regions = Array.from(
    new Set(
      (resortsData as Resort[])
        .reduce<string[]>(
          (prev, curr) => prev.concat(curr.continent, curr.country),
          []
        )
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    )
  );

  const [query, setQuery] = useState("");
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [shownDetails, setShownDetails] = useState("");

  const initialResorts = resortsData.sort(
    (a: Resort, b: Resort) => b.score - a.score
  );

  useEffect(() => {
    // reduces jank when scrolling on mobile devices
    const onTouchMoveListener = (e: Event) => e.preventDefault();
    document.addEventListener("ontouchmove", onTouchMoveListener);
    //

    if (!query) {
      setResorts([]);
      return;
    }
    const results = initialResorts
      .filter((x: Resort) => {
        return (
          query === x.country.toLowerCase() ||
          query === x.continent.toLowerCase()
        );
      })
      .slice(0, MAX_RESORTS_DISPLAY);
    setResorts(results);
    return function cleanup() {
      document.removeEventListener("ontouchmove", onTouchMoveListener);
    };
  }, [query, initialResorts]);

  return (
    <>
      <Head>
        <title>{siteName}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={url} />
        <meta property="og:url" content={`${url}/og.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:image:alt" content="Snowcapped mountains" />
      </Head>

      <main>
        {/* area1 */}
        <div className="flow">
          <header className="center">
            <Header
              regions={regions}
              onInput={(q) => {
                setQuery(q);
              }}
            />
          </header>
          {resorts.length === 0 && (
            <p className="center fadein">
              {query
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
          <MainScene
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

        <SnowflakesScene />
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
