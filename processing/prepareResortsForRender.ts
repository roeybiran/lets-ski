import type P5 from "p5";
import {
  COLOR_DIFF_STEP,
  COLOR_LEFT_FACE,
  COLOR_RIGHT_FACE,
  STEEPNESS_FACTOR,
} from "../constants";
import shuffle from "../util/shuffleArray";
import findSnowcapOuterVertexX from "./findSnowcapOuterVertexX";

interface Props {
  p: P5;
  resorts: Resort[];
  canvasWidth: number;
  canvasHeight: number;
  maxMountainHeight: number;
}

export default function prepareResortForRender({
  resorts,
  canvasWidth,
  canvasHeight,
  maxMountainHeight,
}: Props) {
  const highestResort = Math.max(...resorts.map((x) => x.altitude));
  const bestScoringResort = Math.max(...resorts.map((x) => x.score));
  const hardestResort = Math.max(...resorts.map((x) => x.difficulty));
  // add one so the rightmost resort won't cut off
  const mountainSlotWidth = canvasWidth / (resorts.length + 1);

  // randomly position mountain centers across the canvas...
  const output = shuffle(resorts)
    .map((val, idx) => {
      // add one so the leftmost resort will not be cutoff
      const positionOfCenter = (idx + 1) * mountainSlotWidth;

      return {
        ...val,
        positionOfCenter,
      };
    })
    // ... but  render highest first to not obscure lower
    .sort((a, b) => b.altitude - a.altitude)
    .reverse()
    // reverse to make highest resort the darkest
    .map(
      (
        {
          name,
          id,
          continent,
          country,
          url,
          altitude,
          score,
          difficulty,
          positionOfCenter,
        },
        idx
      ) => {
        //
        const relativeHeight = altitude / highestResort;
        const relativeScore = score / bestScoringResort;
        const relativeDifficulty = difficulty / hardestResort;

        const relativeSteepness = relativeDifficulty * STEEPNESS_FACTOR;
        const effectiveHeight = maxMountainHeight * relativeHeight;
        const effectiveWidth = effectiveHeight / relativeSteepness / 2; // per-face width

        const snowCoverage = Math.min(0.66, Math.max(relativeScore, 0.33));

        const faceTopVertexY = canvasHeight - effectiveHeight;
        const snowcapInnerVertexY =
          canvasHeight - effectiveHeight + effectiveHeight * snowCoverage;

        const faces = ["leftFace", "rightFace"].map((face) => {
          const _face = {
            outer: {
              x:
                positionOfCenter +
                (face === "leftFace" ? -effectiveWidth : effectiveWidth),
              y: canvasHeight,
            },
            top: {
              x: positionOfCenter,
              y: faceTopVertexY,
            },
            inner: {
              x: positionOfCenter,
              y: canvasHeight,
            },
          };

          // snowcap
          // find the outervertex's x using law of sines
          const snowcapOuterVertexX = findSnowcapOuterVertexX(
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
              // give a %5 slope to the snowcap
              y: snowcapInnerVertexY - snowcapInnerVertexY * 0.05,
            },
          };

          return { face: _face, snowcap };
        });

        return {
          name,
          id,
          continent,
          country,
          url,
          altitude,
          score,
          difficulty,
          positionOfCenter,
          leftFace: faces[0],
          rightFace: faces[1],
          leftFaceColor: COLOR_LEFT_FACE.map((v) => v - COLOR_DIFF_STEP * idx),
          rightFaceColor: COLOR_RIGHT_FACE.map(
            (v) => v - COLOR_DIFF_STEP * idx
          ),
        };
      }
    )
    .reverse();

  return output;
}
