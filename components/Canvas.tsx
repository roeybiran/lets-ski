import type P5 from "p5";
import p5 from "p5";
import { MutableRefObject, useEffect, useRef } from "react";
import mountains from "../lib/mountains";
import prepareResortsForRender from "../lib/prepareResortsForRender";
import snowflakes from "../lib/snowflakes";

// https://github.com/atorov/react-p5js-flocking-boids-demo/blob/master/src/components/P5Wrapper/index.jsx

const makeScene = (
  resorts: Resort[] = [],
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const scene = (p: P5) => {
    const width = document.body.clientWidth;
    const height = p.windowHeight;
    const maxMountainHeight = (height / 3) * 2;
    const maxMountainWidth = width / 2;

    const renderedResorts = prepareResortsForRender(resorts);

    p.setup = () => {
      const cnv = p.createCanvas(width, height);
      cnv.style("display", "block");
    };

    p.windowResized = () => {
      p.resizeCanvas(width, height);
    };

    p.draw = () => {
      // snowflakes(p);
      mountains(
        p,
        renderedResorts,
        maxMountainWidth,
        maxMountainHeight,
        height
      );
    };
  };

  return new p5(scene, ref.current!);
};

export default function Canvas({ resorts }: { resorts: Resort[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scene = makeScene(resorts, rootRef);
    return function cleanup() {
      scene.remove();
    };
  }, [resorts]);
  return <div id="canvas-container" ref={rootRef} />;
}
