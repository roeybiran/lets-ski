import type P5 from "p5";
import p5 from "p5";
import calculateAngleBetween2Lines from "../util/calculateAngleBetween2Lines";

const COLOR_SNOWCAP = [255, 255, 255, 204];
const SNOWCAP_SLOPE_OFFSET = 20;

export default function mountains(
  p: P5,
  resorts: RenderedResort[],
  maxMountainWidth: number,
  maxMountainHeight: number,
  canvasHeight: number
) {
  let offset = 0;

  resorts.forEach((r) => {
    const actualHeight = maxMountainHeight * r.relativeHeight;
    const actualWidth = actualHeight / r.relativeSteepness;

    p.noStroke();
    //

    ["leftFace", "rightFace"].forEach((face) => {
      const outerVertex = {
        x: face === "leftFace" ? offset : offset + actualWidth,
        y: canvasHeight,
      };
      const topVertex = {
        x: offset + actualWidth / 2,
        y: canvasHeight - actualHeight,
      };
      const innerVertex = { x: offset + actualWidth / 2, y: canvasHeight };

      // @ts-ignore
      p.fill(r[`${face}Color`]);
      p.triangle(
        outerVertex.x,
        outerVertex.y,
        topVertex.x,
        topVertex.y,
        innerVertex.x,
        innerVertex.y
      );

      // snowcap
      // find the outervertex's x using law of sines
      const snowcapInnerVertexY =
        canvasHeight - actualHeight * r.relativeScore - 20;

      const topAngle = calculateAngleBetween2Lines(
        [topVertex.x, topVertex.y],
        [innerVertex.x, snowcapInnerVertexY],
        [outerVertex.x, outerVertex.y]
      );

      const innerAngle = p.radians(90);

      const sinTop = Math.sin(topAngle);
      const sinInner = Math.sin(innerAngle);
      const cosTop = Math.cos(topAngle);
      const cosInner = Math.cos(innerAngle);

      const sideA = p.dist(
        topVertex.x,
        topVertex.y,
        innerVertex.x,
        snowcapInnerVertexY
      );
      const sideB = sideA * (sinTop / (sinInner * cosTop + sinTop * cosInner));
      const snowcapOuterVertexX = innerVertex.x - sideB;

      p.fill(COLOR_SNOWCAP);
      p.triangle(
        snowcapOuterVertexX,
        snowcapInnerVertexY,
        topVertex.x,
        topVertex.y,
        innerVertex.x,
        snowcapInnerVertexY - SNOWCAP_SLOPE_OFFSET
      );
    });

    offset += actualWidth / 2;
  });
}
