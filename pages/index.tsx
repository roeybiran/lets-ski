import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAllResorts } from "../lib/resortsParser";
import { GetStaticProps } from "next";
import Resort from "../lib/Resort";

export default function Home({ resortsData }: { resortsData: Resort[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Let's Ski!</title>
      </Head>

      <header>
        <h1 className={styles.title}>Let's Ski!</h1>

        <p className={styles.description}>
          Get started by typing the name of any continent, country, city, resort
          or area.
        </p>
      </header>
      <main className={styles.main}></main>

      <footer className={styles.footer}>
        By&nbsp;
        <a
          href="https://github.com/roeybiran"
          target="_blank"
          rel="noopener noreferrer"
        >
          Roey Biran
        </a>
        &nbsp;&amp; May Rosner
      </footer>
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const resortsData = getAllResorts();
//   return { props: { resortsData } };
// };
// export const getServer
