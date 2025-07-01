import findSnowcapOuterVertexX from './findSnowcapOuterVertexX';
import calculateResortRanking from './calculateResortRanking';

const MAX_MOUNTAIN_HEIGHT_RATIO = 0.66; // in relation to the canvas/viewport

interface Props {
	resorts: ReturnType<typeof calculateResortRanking>;
	canvasHeight: number;
	canvasWidth: number;
}

export default function calculateResortGeometries({
	resorts,
	canvasWidth,
	canvasHeight,
}: Props) {
	const mountainSlotWidth = canvasWidth / (resorts.length + 1);
	return resorts.map(
		({
			relativeHeight,
			relativeSteepness,
			relativeScore,
			slotPosition,
			...resort
		}) => {
			//
			const effectiveHeight =
				canvasHeight * MAX_MOUNTAIN_HEIGHT_RATIO * relativeHeight;
			const effectiveWidth = effectiveHeight / relativeSteepness / 2; // per-face width
			const snowCoverage = Math.min(0.66, Math.max(relativeScore, 0.33));
			// add one so the rightmost resort won't cut off
			const faceTopVertexY = canvasHeight - effectiveHeight;
			const snowcapInnerVertexY =
				canvasHeight - effectiveHeight + effectiveHeight * snowCoverage;
			const positionOfCenter = slotPosition * mountainSlotWidth;

			const faces = ['leftFace', 'rightFace'].map((face) => {
				const _face = {
					outer: {
						x:
							positionOfCenter +
							(face === 'leftFace' ? -effectiveWidth : effectiveWidth),
						y: canvasHeight,
					},
					top: {
						x: positionOfCenter,
						y: faceTopVertexY,
					},
					inner: {
						x: positionOfCenter,
						y: canvasHeight,
					},
				};

				// snowcap
				// find the outervertex's x using law of sines
				const snowcapOuterVertexX = findSnowcapOuterVertexX(
					_face.top.x,
					_face.top.y,
					_face.inner.x,
					_face.inner.y,
					_face.outer.x,
					_face.outer.y,
					snowcapInnerVertexY
				);

				const snowcap = {
					outer: {
						x: snowcapOuterVertexX,
						y: snowcapInnerVertexY,
					},
					top: {
						x: _face.top.x,
						y: _face.top.y,
					},
					inner: {
						x: _face.inner.x,
						// give a %5 slope to the snowcap
						y: snowcapInnerVertexY - snowcapInnerVertexY * 0.05,
					},
				};

				return { face: _face, snowcap };
			});

			return {
				...resort,
				positionOfCenter,
				leftFace: faces[0],
				rightFace: faces[1],
			};
		}
	);
}
