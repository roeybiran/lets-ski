interface Props {
  continents: string[];
  countries: string[];
  onInput: (s: string) => void;
}

const NOOP = "NOOP";

export default function Header({ continents, countries, onInput }: Props) {
  return (
    <div className="root">
      <h1 className="fadein">Let’s Ski!</h1>
      <form>
        <label htmlFor="areas-list" className="sr-only">
          Find the top 10 ski resorts by region:
        </label>

        <select
          className="fadein"
          id="areas-list"
          name="areas"
          onChange={(e) => {
            e.preventDefault();
            const v: string = e.target.value;
            onInput(v === NOOP ? "" : v.toLowerCase());
          }}
        >
          <option value={NOOP}>Please choose an area</option>
          {continents.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
          {countries.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </form>
      <style jsx>{`
        .root {
          display: flex;
          gap: 0.5rem 1rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        h1 {
          font-size: 1.5rem;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
