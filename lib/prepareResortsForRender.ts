const COLOR_RIGHT_FACE = [201, 232, 249];
const COLOR_LEFT_FACE = [167, 196, 248];
const COLOR_DIFF_STEP = 15; // higher value means greater color difference
const EASING = 0.1;
// steeper than this and the mountain will look like a needle
const STEEPNESS_FACTOR = 2;
const MAX_SNOW_COVERAGE = 0.66;

export default function prepareResortForRender(resorts: Resort[]) {
  const highestResort = Math.max(...resorts.map((x) => x.altitude));
  const bestScoringResort = Math.max(...resorts.map((x) => x.score));
  const hardestResort = Math.max(...resorts.map((x) => x.difficulty));

  const output = resorts
    .sort((a, b) => b.altitude - a.altitude)
    .reverse()
    .map((val, idx) => {
      // highest resort is also the darkest
      return {
        ...val,
        leftFaceColor: COLOR_LEFT_FACE.map((v) => v - COLOR_DIFF_STEP * idx),
        rightFaceColor: COLOR_RIGHT_FACE.map((v) => v - COLOR_DIFF_STEP * idx),
      };
    })
    .reverse()
    .map((val) => {
      const relativeHeight = val.altitude / highestResort;
      const relativeScore = (val.score / bestScoringResort) * MAX_SNOW_COVERAGE;
      const relativeDifficulty = val.difficulty / hardestResort;
      const relativeSteepness = relativeDifficulty * STEEPNESS_FACTOR;
      return {
        ...val,
        relativeHeight,
        relativeScore,
        relativeSteepness,
      };
    });

  return output;
}
