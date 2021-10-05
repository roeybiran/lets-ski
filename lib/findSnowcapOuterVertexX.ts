import calculateAngleBetween2Lines from "../util/calculateAngleBetween2Lines";
import type P5 from "p5";

export default function findSnowcapOuterVertexX(
  p: P5,
  topX: number,
  topY: number,
  innerX: number,
  innerY: number,
  outerX: number,
  outerY: number,
  snowcapInnerY: number
) {
  const topAngle = calculateAngleBetween2Lines(
    [topX, topY],
    [innerX, innerY],
    [outerX, outerY]
  );

  const innerAngle = p.radians(90);

  const sinTop = Math.sin(topAngle);
  const sinInner = Math.sin(innerAngle);
  const cosTop = Math.cos(topAngle);
  const cosInner = Math.cos(innerAngle);

  const sideA = p.dist(topX, topY, innerX, snowcapInnerY);
  const sideB = sideA * (sinTop / (sinInner * cosTop + sinTop * cosInner));
  return innerX - sideB;
}
