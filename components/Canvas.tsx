import type P5 from "p5";
import p5 from "p5";
import { useEffect, useRef } from "react";
import snowflakes from "./snowflakes";

// https://github.com/atorov/react-p5js-flocking-boids-demo/blob/master/src/components/P5Wrapper/index.jsx

// function setup() {
//   createCanvas(500, 500);
//   triangle(250, 500, 300, 500, 250, 250)
//   fill('red')
//   const magicX = 300
//   const magicY = 500
//   triangle(250, 400, magicX, magicY, 250, 250)
// }

function Scene(p: P5) {
  p.setup = () => {
    p.createCanvas(200, 200);
  };
  p.draw = () => {
    p.circle(10, 10, 10);
    snowflakes(p);
  };
}

export default function Canvas() {
  const rootRef = useRef(null);
  useEffect(() => {
    const canvas = new p5(Scene, rootRef.current!);
    return function cleanup() {
      canvas.remove();
    };
  }, []);
  return <div ref={rootRef} />;
}
