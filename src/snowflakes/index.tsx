import type P5 from 'p5';
import p5 from 'p5';
import { useEffect, useRef } from 'react';
import snowflakes from './snowflakes';

export default function Snowflakes() {
	const rootRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const matcher = window.matchMedia('(prefers-reduced-motion: reduce)');
		// matcher.addEventListener('change', () => {})
		if (matcher.matches) {
			return;
		}
		const scene = new p5((p: P5) => {
			p.setup = () => {
				const width = p.windowWidth;
				const height = p.windowHeight;
				const cnv = p.createCanvas(width, height);
				cnv.style('display', 'block');
			};

			p.windowResized = () => {
				const width = document.documentElement.clientWidth;
				const height = p.windowHeight;
				p.resizeCanvas(width, height);
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
	return <div id="snowflakes" ref={rootRef} />;
}
