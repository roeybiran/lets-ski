import { ChangeEvent } from "react";

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
          <optgroup label="Continents">
            {continents.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </optgroup>
          <optgroup label="Countries">
            {countries.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </optgroup>
        </select>
        {/* <input
          className="fadein"
          id="search-field"
          type="search"
          placeholder="e.g. France"
          list="resort-countries-list"
          onInput={(evt: ChangeEvent<HTMLInputElement>) => {
            evt.preventDefault();
            onInput(evt.target.value.trim().toLowerCase());
          }}
        />
        <datalist id="resort-countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist> */}
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

        #search-field {
          appearance: none;
          border: 1px solid var(--blue);
          border-radius: 8px;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
