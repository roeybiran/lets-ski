import { lerp } from '../util';

let animationValues: { [k: string]: number } = {};

const animated = {
	currentValueFor: (key: string, start: number, target: number) => {
		if (!animationValues[key]) {
			animationValues[key] = start;
		}
		animationValues[key] = lerp(animationValues[key], target, 0.05);
		return animationValues[key];
	},
	invalidate: () => {
		animationValues = {};
	},
};

export default animated;
