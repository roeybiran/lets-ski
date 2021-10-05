import type P5 from "p5";
import prepareResortForRender from "./prepareResortsForRender";

const COLOR_SNOWCAP = [255, 255, 255, 204];
const EASING = 0.1;

export default function mountains(
  p: P5,
  resorts: ReturnType<typeof prepareResortForRender>
) {
  p.noStroke();
  resorts.forEach((r) => {
    //

    ["leftFace", "rightFace"].forEach((__face) => {
      const _face = __face as "leftFace" | "rightFace";
      const { face, snowcap } = r[_face];

      p.fill(r[`${_face}Color`]);
      p.triangle(
        face.outer.x,
        face.outer.y,
        face.top.x,
        face.top.y,
        face.inner.x,
        face.inner.y
      );

      // snowcap
      p.fill(COLOR_SNOWCAP);
      p.triangle(
        snowcap.outer.x,
        snowcap.outer.y,
        snowcap.top.x,
        snowcap.top.y,
        snowcap.inner.x,
        snowcap.inner.y
      );
    });
  });
}
