type Point = [number, number];

export default function calculateAngleBetween2Lines(
  sharedPoint: Point,
  point1: Point,
  point2: Point
) {
  const dx0 = sharedPoint[0] - point1[0];
  const dy0 = sharedPoint[1] - point1[1];
  const dx1 = sharedPoint[0] - point2[0];
  const dy1 = sharedPoint[1] - point2[1];
  return Math.atan2(dx0 * dy1 - dx1 * dy0, dx0 * dx1 + dy0 * dy1);
}
