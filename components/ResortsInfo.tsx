export default function ResortInfoList({
  resorts,
  idToShow,
  didClose,
}: {
  resorts: Resort[];
  idToShow: string;
  didClose: () => void;
}) {
  if (resorts.length === 0) return null;
  return (
    <div>
      <ul className="root">
        {resorts.map(
          ({ id, name, country, url, score, altitude, difficulty }) => (
            <li
              key={id}
              className="metabox"
              style={{
                visibility: String(id) === idToShow ? "visible" : "hidden",
              }}
            >
              <ul className="flow-s">
                <li>{name}</li>
                <li>{country}</li>
                <li>
                  <span>Score:</span> {score.toFixed(2)}
                </li>
                <li>
                  <span>Altitude:</span> {altitude}
                </li>
                <li>
                  <span>Difficulty:</span> {difficulty.toFixed(2)}
                </li>
                <li>
                  <a href={url}>Website</a>
                </li>
              </ul>
              <button type="button" onClick={didClose}>
                Close
              </button>
            </li>
          )
        )}
        <style jsx>{`
          .root {
            font-family: monospace;
            display: grid;
            justify-items: center;
          }
          .root > * {
            grid-area: 1/1;
          }
          .metabox {
            border: 1px solid black;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: white;
            padding: 0.5rem;
            margin-inline: 1rem;
            z-index: 1;
          }
          .metabox li:first-child {
            font-weight: 700;
          }
          .metabox span {
            text-transform: lowercase;
          }
          .metabox button {
            margin-block-start: 0.5rem;
            padding: 0.25rem;
          }
        `}</style>
      </ul>
    </div>
  );
}
