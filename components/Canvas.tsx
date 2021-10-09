import type P5 from "p5";
import p5 from "p5";
import { MutableRefObject, useEffect, useRef } from "react";
import {
  MAX_MOUNTAIN_HEIGHT_RATIO,
  MAX_MOUNTAIN_WIDTH_RATIO,
} from "../constants";
import animated from "../processing/animations";
import mountains from "../processing/mountains";
import prepareResortsForRender from "../processing/prepareResortsForRender";
import snowflakes from "../processing/snowflakes";

// https://github.com/atorov/react-p5js-flocking-boids-demo/blob/master/src/components/P5Wrapper/index.jsx

const makeScene = (
  resorts: Resort[] = [],
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const scene = (p: P5) => {
    //
    const getRenderSettings = () => {
      const canvasWidth = document.documentElement.clientWidth;
      const canvasHeight = p.windowHeight;
      const maxMountainHeight = canvasHeight * MAX_MOUNTAIN_HEIGHT_RATIO;
      const maxMountainWidth = canvasWidth * MAX_MOUNTAIN_WIDTH_RATIO;

      const renderedResorts = prepareResortsForRender({
        p,
        resorts,
        canvasWidth,
        canvasHeight,
        maxMountainHeight,
      });

      renderedResorts.forEach(({ leftFace, id, name }, index) => {
        const btn = document.getElementById(`resort-button-${name + id}`)!;
        btn.style.insetBlockStart = `${leftFace.face.top.y}px`;
        btn.style.insetInlineStart = `${leftFace.face.top.x}px`;
        btn.style.animationDelay = `${1 + index / 10}s`;
      });

      return {
        canvasWidth,
        canvasHeight,
        maxMountainHeight,
        maxMountainWidth,
        renderedResorts,
      };
    };

    let current: ReturnType<typeof getRenderSettings>;

    p.setup = () => {
      current = getRenderSettings();
      const cnv = p.createCanvas(current.canvasWidth, current.canvasHeight);
      cnv.style("display", "block");
    };

    p.windowResized = () => {
      current = getRenderSettings();
      p.resizeCanvas(current.canvasWidth, current.canvasHeight);
    };

    p.draw = () => {
      p.clear();
      p.noStroke();
      mountains(p, current.renderedResorts);
      snowflakes(p);
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
      animated.invalidate();
    };
  }, [resorts]);
  return <div id="canvas-container" ref={rootRef} />;
}
