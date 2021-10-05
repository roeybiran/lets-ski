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
    const canvasWidth = document.body.clientWidth;
    const canvasHeight = p.windowHeight;
    const maxMountainHeight = (canvasHeight / 3) * 2;
    const maxMountainWidth = canvasWidth / 2;

    const renderedResorts = prepareResortsForRender({
      p,
      resorts,
      canvasWidth,
      canvasHeight,
      maxMountainHeight,
    });

    p.setup = () => {
      const cnv = p.createCanvas(canvasWidth, canvasHeight);
      cnv.style("display", "block");
    };

    p.windowResized = () => {
      p.resizeCanvas(canvasWidth, canvasHeight);
    };

    p.draw = () => {
      // snowflakes(p);
      mountains(p, renderedResorts);
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
