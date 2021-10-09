import type P5 from "p5";

type Snowflake = ReturnType<typeof makeSnowflake>;

let _snowflakes: Snowflake[] = [];

// https://p5js.org/examples/simulate-snowflakes.html
export default function snowflakes(p: P5) {
  // create a random number of snowflakes each frame

  const t = p.frameCount / 60; // update time
  for (let i = 0; i < p.random(); i += 1) {
    _snowflakes.push(makeSnowflake(p)); // append snowflake object
  }

  _snowflakes.forEach((flake, idx) => {
    const currentY = flake.update(t); // update snowflake position
    // delete snowflake if past end of screen
    if (currentY > p.windowHeight) {
      _snowflakes.splice(idx, 1);
    } else {
      flake.display(); // draw snowflake
    }
  });
}

function makeSnowflake(p: P5) {
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

  const display = () => p.ellipse(posX, posY, FLAKE_SIZE);

  return { display, update };
}
