import type P5 from "p5";

export default function makeSnowflake(p: P5) {
  const startAngle = p.random(0, 2 * p.PI);
  const FLAKE_SIZE = p.random(2, 5);
  const width = p.width;
  // initialize coordinates
  let posX = 0;
  let posY = p.random(-50, 0);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  const radius = p.sqrt(p.random(p.pow(width / 2, 2)));
  const angularSpeed = 0.6; // angular speed

  const update = (time: number) => {
    // x position follows a circle
    posX = width / 2 + radius * p.sin(angularSpeed * time + startAngle);
    // different size snowflakes fall at slightly different y speeds
    posY += p.pow(FLAKE_SIZE, 0.5);
    return posY;
  };

  const display = () => {
    p.ellipse(posX, posY, FLAKE_SIZE);
  };

  return { display, update };
}
