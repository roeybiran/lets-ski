import type P5 from 'p5';
import p5 from 'p5';
import { MutableRefObject, useEffect, useRef } from 'react';
import animated from './animations';
import calculateResortGeometries from './calculateResortGeometries';
import mountains from './mountains';
import prepareResortsForRender from './calculateResortRanking';

// https://github.com/atorov/react-p5js-flocking-boids-demo/blob/master/src/components/P5Wrapper/index.jsx

const makeScene = (
	resorts: Resort[] = [],
	ref: MutableRefObject<HTMLDivElement | null>
) => {
	const scene = (p: P5) => {
		let initialResorts = prepareResortsForRender(resorts);

		const refreshRenderSettings = () => {
			const canvasWidth = p.windowWidth;
			const canvasHeight = p.windowHeight;

			const renderedResorts = calculateResortGeometries({
				resorts: initialResorts,
				canvasWidth,
				canvasHeight,
			});

			renderedResorts.forEach(({ leftFace, id, name }, index) => {
				const btn = document.getElementById(`resort-button-${name + id}`);
				if (!btn) return;
				btn.style.insetBlockStart = `${leftFace.face.top.y}px`;
				btn.style.insetInlineStart = `${leftFace.face.top.x}px`;
				btn.style.animationDelay = `${1 + index / 10}s`;
			});

			return {
				canvasWidth,
				canvasHeight,
				renderedResorts,
			};
		};

		let current: ReturnType<typeof refreshRenderSettings>;

		p.setup = () => {
			current = refreshRenderSettings();
			const cnv = p.createCanvas(current.canvasWidth, current.canvasHeight);
			cnv.style('display', 'block');
			cnv.style('inline-size', '100%');
			cnv.style('block-size', '100%');
		};

		p.windowResized = () => {
			current = refreshRenderSettings();
			p.resizeCanvas(current.canvasWidth, current.canvasHeight);
		};

		p.draw = () => {
			p.clear();
			p.noStroke();
			mountains(p, current.renderedResorts);
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
	return <div id="mountains" ref={rootRef} />;
}
