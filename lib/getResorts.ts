import normalize from "../util/normalize";
// import resorts from "./resorts.json";
import resorts from "./_resorts.json";
import toTitleCase from "../util/toTitleCase";

const RANKING_CRITERIA = [
  "Ski resort size",
  "Slope offering, variety of runs",
  "Lifts and cable cars",
  "Snow reliability",
  "Slope preparation",
  "Access, on-site parking",
  "Orientation (trail map, information boards, sign-postings)",
  "Cleanliness and hygiene",
  "Environmentally friendly ski operation",
  "Friendliness of staff",
  "Mountain restaurants/ski huts/gastronomy",
  "Après-ski",
  "Accommodation offering directly at the slopes and lifts",
  "Families and children",
  "Beginners",
  "Advanced skiers/freeriders",
  "Snow parks",
  "Cross-country skiing and trails",
];

let parsedResorts: Resort[] = [];

export default function getResorts() {
  if (parsedResorts.length === 0) {
    parsedResorts = parseResorts(resorts.data);
  }
  return parsedResorts;
}

function parseResorts(jsonStr: any) {
  return jsonStr
    .filter(
      (r: any) => r.Altitude > 0 && r.Easy && r.Intermediate && r.Difficult
    )
    .map(
      (
        {
          Continent: continent = "",
          Country: country = "",
          Altitude: altitude = 0,
          Difficult: hard = 0,
          Intermediate: intermediate = 0,
          Easy: easy = 0,
          ...r
        }: any,
        i: number
      ) => {
        const name = r["Resort Name"] ?? "";
        const stateOrProvince = r["State/Province"] ?? "";
        const searchString = normalize(continent + country + stateOrProvince);
        const totalKm = hard + intermediate + easy;
        // specicy minimum difficulty in case of lacking data
        const difficulty = Math.max(hard / totalKm, 0.1);
        const averageScore =
          Object.entries(r)
            .filter(([key, value]) => RANKING_CRITERIA.includes(key) && value)
            .flatMap(([, v]) => v as number)
            .reduce((prev, curr) => prev + curr, 0) / RANKING_CRITERIA.length;

        const score = Math.max(0.1, averageScore);
        const url = r.URL;
        const id = i;
        return {
          id,
          name,
          searchString,
          continent,
          country,
          stateOrProvince,
          altitude,
          difficulty,
          score,
          url,
        };
      }
    );
}
