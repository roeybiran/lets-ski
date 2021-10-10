import {
  COLOR_DIFF_STEP,
  COLOR_LEFT_FACE,
  COLOR_RIGHT_FACE,
  STEEPNESS_FACTOR,
} from "../constants";
import shuffle from "../util/shuffleArray";

export default function calculateResortRanking(resorts: Resort[]) {
  const highestResort = Math.max(...resorts.map((x) => x.altitude));
  const bestScoringResort = Math.max(...resorts.map((x) => x.score));
  const hardestResort = Math.max(...resorts.map((x) => x.difficulty));

  // randomly position mountain centers across the canvas...
  const output = shuffle(resorts)
    .map((val, idx) => {
      // add one so the leftmost resort will not be cutoff
      const slotPosition = idx + 1;

      return {
        ...val,
        slotPosition,
      };
    })
    // ... but render highest first to not obscure lower
    .sort((a, b) => b.altitude - a.altitude)
    // reverse to make highest resort the darkest
    .reverse()
    .map(({ altitude, score, difficulty, ...val }, idx) => {
      //
      const relativeHeight = altitude / highestResort;
      const relativeScore = score / bestScoringResort;
      const relativeDifficulty = difficulty / hardestResort;
      const relativeSteepness = relativeDifficulty * STEEPNESS_FACTOR;

      const leftFaceColor = COLOR_LEFT_FACE.map(
        (v) => v - COLOR_DIFF_STEP * idx
      );
      const rightFaceColor = COLOR_RIGHT_FACE.map(
        (v) => v - COLOR_DIFF_STEP * idx
      );

      return {
        ...val,
        relativeHeight,
        relativeScore,
        relativeDifficulty,
        relativeSteepness,
        leftFaceColor,
        rightFaceColor,
      };
    })
    // reverse again
    .reverse();

  return output;
}
