import shuffle from "../util/shuffleArray";
import type P5 from "p5";
import findSnowcapOuterVertexX from "./findSnowcapOuterVertexX";

const COLOR_RIGHT_FACE = [201, 232, 249];
const COLOR_LEFT_FACE = [167, 196, 248];
const COLOR_DIFF_STEP = 15; // higher value means greater color difference
// steeper than this and the mountain will look like a needle
const STEEPNESS_FACTOR = 2;
const MAX_SNOW_COVERAGE = 0.66;
const SNOWCAP_SLOPE_OFFSET = 20;

interface Props {
  p: P5;
  resorts: Resort[];
  canvasWidth: number;
  canvasHeight: number;
  maxMountainHeight: number;
}

export default function prepareResortForRender({
  p,
  resorts,
  canvasWidth,
  canvasHeight,
  maxMountainHeight,
}: Props) {
  const highestResort = Math.max(...resorts.map((x) => x.altitude));
  const bestScoringResort = Math.max(...resorts.map((x) => x.score));
  const hardestResort = Math.max(...resorts.map((x) => x.difficulty));
  const mountainSlotWidth = canvasWidth / resorts.length;

  // console.log(mountainSlots);

  const output = shuffle(resorts)
    // randomly position mountain centers across the canvas...
    .map((val, idx) => {
      const positionOfCenter = (idx + 1) * (mountainSlotWidth / 2);
      return {
        ...val,
        positionOfCenter,
      };
    })
    // ... but  render highest first to not obscure lower
    .sort((a, b) => b.altitude - a.altitude)
    .reverse()
    // reverse to make highest resort the darkest
    .map(({ altitude, score, difficulty, positionOfCenter, ...val }, idx) => {
      //
      const relativeHeight = altitude / highestResort;
      const relativeScore = (score / bestScoringResort) * MAX_SNOW_COVERAGE;
      const relativeDifficulty = difficulty / hardestResort;
      const relativeSteepness = relativeDifficulty * STEEPNESS_FACTOR;

      const actualHeight = maxMountainHeight * relativeHeight;
      const effectiveFaceWidth = actualHeight / relativeSteepness / 2;

      const faces = ["leftFace", "rightFace"].map((face) => {
        const _face = {
          outer: {
            x:
              positionOfCenter +
              (face === "leftFace" ? -effectiveFaceWidth : effectiveFaceWidth),
            y: canvasHeight,
          },
          top: {
            x: positionOfCenter,
            y: canvasHeight - actualHeight,
          },
          inner: {
            x: positionOfCenter,
            y: canvasHeight,
          },
        };

        // snowcap
        const snowcapInnerVertexY = canvasHeight - actualHeight * relativeScore;
        // find the outervertex's x using law of sines
        const snowcapOuterVertexX = findSnowcapOuterVertexX(
          p,
          _face.top.x,
          _face.top.y,
          _face.inner.x,
          _face.inner.y,
          _face.outer.x,
          _face.outer.y,
          snowcapInnerVertexY
        );

        const snowcap = {
          outer: {
            x: snowcapOuterVertexX,
            y: snowcapInnerVertexY,
          },
          top: {
            x: _face.top.x,
            y: _face.top.y,
          },
          inner: {
            x: _face.inner.x,
            y: snowcapInnerVertexY - SNOWCAP_SLOPE_OFFSET,
          },
        };

        return { face: _face, snowcap };
      });

      return {
        altitude,
        score,
        difficulty,
        positionOfCenter,
        leftFace: faces[0],
        rightFace: faces[1],
        leftFaceColor: COLOR_LEFT_FACE.map((v) => v - COLOR_DIFF_STEP * idx),
        rightFaceColor: COLOR_RIGHT_FACE.map((v) => v - COLOR_DIFF_STEP * idx),
      };
    })
    .reverse();

  return output;
}
