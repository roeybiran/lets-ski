import { ChangeEvent } from "react";

interface Props {
  countries: string[];
  onInput: (s: string) => void;
}

export default function Header({ countries, onInput }: Props) {
  return (
    <div className="root">
      <h1 className="fadein">Let’s Ski!</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-field" className="sr-only">
          Find the top 10 ski resorts by country or continent:
        </label>
        <input
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
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </datalist>
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
        }
      `}</style>
    </div>
  );
}
