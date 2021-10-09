import type P5 from "p5";
import p5 from "p5";
import { useEffect, useRef } from "react";
import snowflakes from "../processing/snowflakes";

export default function Snowflakes() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scene = new p5((p: P5) => {
      p.setup = () => {
        const cnv = p.createCanvas(
          document.documentElement.clientWidth,
          p.windowHeight
        );
        cnv.style("display", "block");
      };

      p.windowResized = () => {
        p.resizeCanvas(document.documentElement.clientWidth, p.windowHeight);
      };

      p.draw = () => {
        p.clear();
        p.noStroke();
        snowflakes(p);
      };
    }, rootRef.current!);

    return function cleanup() {
      scene.remove();
    };
  }, []);
  return <div ref={rootRef} />;
}
