import { Search } from "./Icons";
import { bhkOptions, locationOptions, possessionOptions, typeOptions } from "@/lib/filters";

/** A plain GET form: it works before JavaScript loads and lands on the search page with the filters set. */
export function HomeSearch() {
  return (
    <form className="search" action="/properties/" method="get" role="search" aria-label="Find a property">
      <div className="search-mode" role="radiogroup" aria-label="Looking to">
        {[
          ["", "All"],
          ["buy", "Buy"],
          ["rent", "Rent"],
        ].map(([value, label]) => (
          <label className="seg" key={value}>
            <input type="radio" name="intent" value={value} defaultChecked={value === ""} />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <div className="field">
        <label htmlFor="s-location">Location</label>
        <select id="s-location" name="location" defaultValue="">
          <option value="">All locations</option>
          {locationOptions().map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="s-type">Property type</label>
        <select id="s-type" name="type" defaultValue="">
          <option value="">Any type</option>
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="s-bhk">Bedrooms</label>
        <select id="s-bhk" name="bhk" defaultValue="">
          <option value="">Any</option>
          {bhkOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="s-possession">Possession</label>
        <select id="s-possession" name="possession" defaultValue="">
          <option value="">Any status</option>
          {possessionOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <button className="btn search-go" type="submit">
        <Search />
        <span>Search</span>
      </button>
    </form>
  );
}
