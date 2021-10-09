export default function About() {
  return (
    <>
      <div className="center root">
        <section className="flow">
          <h2>How It Works</h2>
          <ul className="flow-s">
            <li>
              Searching for a country or continent yields the top 10 ski resorts
              in that area. This score is based on multiple criteria, like snow
              quality and accommodation offerings.
            </li>
            <li>
              Resorts with a greater average altitudes are represented by a
              higher mountain.
            </li>
            <li>Resorts with greater average difficulty appear steeper.</li>
            <li>A higher scoring resort will have a bigger snowcap.</li>
          </ul>
        </section>
        <section className="flow">
          <h2>About</h2>
          <div className="flow-s">
            <p>
              “Let’s Ski” originated as a university assignment in a creative
              coding class, where the objective was to present big data in an
              enticing way, using{" "}
              <a href="https://processing.org">Processing</a>.
            </p>
            <p>
              When we found{" "}
              <a href="https://www.kaggle.com/beaubellamy/ski-resorts">
                this data set from Kaggle
              </a>{" "}
              we immediately knew this is the resource we’d like to utilize —
              we’re both ski lovers.
            </p>
            <p>
              This porject was built with <a href="https://p5js.org">p5.js</a>{" "}
              and <a href="https://nextjs.org">Next.js</a>.
            </p>
            <p>
              By <a href="https://github.com/roeybiran">Roey Biran</a> and May
              Rosner
            </p>
          </div>
        </section>
      </div>
      <style jsx>{`
        .root {
          max-width: 60ch;
          background-color: white;
          padding-block: 2rem;
        }

        .root section + section {
          margin-top: 2rem;
        }

        ul {
          padding-inline-start: 1rem;
          list-style-type: disc;
        }

        p:last-of-type {
          margin-block-start: 2rem;
          font-size: 0.75em;
          font-style: italic;
        }

        h2 {
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
