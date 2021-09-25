// @ts-ignore
/*
gets the top 5 resorts from the raw json,
fills the required properties for rendering.
Sorts by descending height.
*/

import resorts from "./resorts";

function parseJson(json: string) {
  // return JSON.parse(json).data[0];
}

let parsedResorts: Resort[] = [];

export default function getResorts() {
  // return parseJson()
  console.log(resorts[0]);

  //   .filter((resort) => {
  //     return (
  //       resort.Altitude > 0 &&
  //       resort.Easy &&
  //       resort.Intermediate &&
  //       resort.Difficult &&
  //       [resort.Country, resort.Continent]
  //         .map((x) => x.toLowerCase())
  //         .includes(query)
  //     );
  //   })
  //   .map((resort) => {
  //     const hard = resort.Difficult;
  //     const totalKm = hard + resort.Intermediate + resort.Easy;
  //     // specicy minimum difficulty in case of lacking data
  //     const difficulty = hard / totalKm > 0.5 ? hard / totalKm : 0.5;
  //     let score =
  //       Object.keys(resort)
  //         .filter((prop) => {
  //           return criteria.includes(prop);
  //         })
  //         .reduce((prevVal, currVal) => {
  //           return (resort[prevVal] || 0) + (resort[currVal] || 0);
  //         }, 0) / criteria.length;
  //     if (score === 0) {
  //       score = 0.1;
  //     }
  //     return {
  //       name: resort["Resort Name"].replace(/-/g, " ").toTitleCase(),
  //       continent: resort.Continent.toLowerCase(),
  //       country: resort.Country.toLowerCase(),
  //       altitude: resort.Altitude,
  //       score,
  //       difficulty,
  //     };
  //   })
  //   .sort((a, b) => {
  //     return b.score - a.score;
  //   })
  //   .slice(0, 5)
  //   .calculateRelativeProperties("difficulty")
  //   .calculateRelativeProperties("altitude")
  //   .sort((a, b) => {
  //     return a.altitudeRelative - b.altitudeRelative;
  //   })
  //   .reverse()
  //   // fill colors
  //   .map((x, idx) => {
  //     const resort = x;
  //     const leftFaceColor = COLOR_LEFT_FACE.map((value) => {
  //       return value - COLOR_DIFF_STEP * idx;
  //     });
  //     const rightFaceColor = COLOR_RIGHT_FACE.map((value) => {
  //       return value - COLOR_DIFF_STEP * idx;
  //     });
  //     resort.rightFaceColor = rightFaceColor;
  //     resort.leftFaceColor = leftFaceColor;
  //     return resort;
  //   });
  // const locations = resorts.map((_, i) => {
  //   const center = width / (resorts.length + 1);
  //   return center * (i + 1);
  // });
  // const locationsShuffled = shuffle(locations);
  // resorts = resorts.map((x, i) => {
  //   const resort = x;
  //   resort.center = locationsShuffled[i];
  //   return resort;
  // });
  // return resorts;
}
