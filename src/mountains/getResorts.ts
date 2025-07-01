import fs from 'fs';
import path from 'path';

const RANKING_CRITERIA = [
	'Ski resort size',
	'Slope offering, variety of runs',
	'Lifts and cable cars',
	'Snow reliability',
	'Slope preparation',
	'Access, on-site parking',
	'Orientation (trail map, information boards, sign-postings)',
	'Cleanliness and hygiene',
	'Environmentally friendly ski operation',
	'Friendliness of staff',
	'Mountain restaurants/ski huts/gastronomy',
	'Après-ski',
	'Accommodation offering directly at the slopes and lifts',
	'Families and children',
	'Beginners',
	'Advanced skiers/freeriders',
	'Snow parks',
	'Cross-country skiing and trails',
];

type Cache = {
	regions: string[];
	resorts: Resort[];
	initialResorts: Resort[];
};

let cache: Cache = {
	regions: [],
	resorts: [],
	initialResorts: [],
};

export default function getResorts() {
	if (!cache.regions.length || !cache.resorts.length) {
		const resorts = parseResorts(
			fs.readFileSync(path.join(process.cwd(), 'db', 'resorts.json'), 'utf-8')
		).sort((a: Resort, b: Resort) => b.score - a.score);

		const regions = Array.from(
			new Set(
				resorts
					.map(({ country, continent }) => [country, continent])
					.reduce((prev, curr) => prev.concat(curr))
					.sort((a, b) =>
						a.localeCompare(b, undefined, { sensitivity: 'base' })
					)
			)
		);

		cache.initialResorts = resorts.slice(0, 10);
		cache.resorts = resorts;
		cache.regions = regions;
	}

	return {
		regions: cache.regions,
		resorts: cache.resorts,
		initialResorts: cache.initialResorts,
	};
}

function parseResorts(jsonString: string) {
	return (JSON.parse(jsonString).data as any[])
		.filter((r) => r.Altitude > 0 && r.Easy && r.Intermediate && r.Difficult)
		.map(
			(
				{
					Continent: continent = '',
					Country: country = '',
					Altitude: altitude = 0,
					Difficult: hard = 0,
					Intermediate: intermediate = 0,
					Easy: easy = 0,
					...r
				},
				idx: number
			) => {
				const name: string = r['Resort Name'];
				const totalKm = hard + intermediate + easy;
				// specicy minimum difficulty in case of lacking data
				const difficulty = Math.max(hard / totalKm, 0.1);
				const score =
					Object.entries(r)
						.filter(([key, value]) => RANKING_CRITERIA.includes(key) && value)
						.flatMap(([, v]) => v as number)
						.reduce((prev, curr) => prev + curr, 0) / RANKING_CRITERIA.length;

				const url = r.URL;
				const id = idx;
				return {
					id,
					name,
					continent,
					country,
					altitude,
					difficulty,
					url,
					score,
				};
			}
		);
}
