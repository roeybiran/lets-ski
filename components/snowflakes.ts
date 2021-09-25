import type P5 from "p5";
import makeSnowflake from "./makeSnowflake";

type Snowflake = ReturnType<typeof makeSnowflake>;

let _snowflakes: Snowflake[] = [];

// let run = true;
export default function snowflakes(p: P5) {
  // create a random number of snowflakes each frame
  p.clear();
  p.noStroke();
  const t = p.frameCount / 60; // update time
  for (let i = 0; i < p.random(); i += 1) {
    _snowflakes.push(makeSnowflake(p)); // append snowflake object
  }

  // delete snowflake if past end of screen

  _snowflakes.forEach((flake, idx) => {
    const currentY = flake.update(t); // update snowflake position
    if (currentY > p.height) {
      _snowflakes.splice(idx, 1);
    } else {
      flake.display(); // draw snowflake
    }
  });

  console.log(_snowflakes.length);
  // _snowflakes = _snowflakes.filter((s) => s.posY < p.height);
}
