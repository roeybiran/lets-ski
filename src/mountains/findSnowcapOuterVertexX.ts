import { dist, toRadians } from '../util';
import calculateAngleBetween2Lines from './calculateAngleBetween2Lines';

export default function findSnowcapOuterVertexX(
	topX: number,
	topY: number,
	innerX: number,
	innerY: number,
	outerX: number,
	outerY: number,
	snowcapInnerY: number
) {
	const topAngle = calculateAngleBetween2Lines(
		[topX, topY],
		[innerX, innerY],
		[outerX, outerY]
	);

	const innerAngle = toRadians(90);

	const sinTop = Math.sin(topAngle);
	const sinInner = Math.sin(innerAngle);
	const cosTop = Math.cos(topAngle);
	const cosInner = Math.cos(innerAngle);

	const sideA = dist(topX, topY, innerX, snowcapInnerY);
	const sideB = sideA * (sinTop / (sinInner * cosTop + sinTop * cosInner));
	return innerX - sideB;
}
