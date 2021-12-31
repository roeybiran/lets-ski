import fs from 'fs';
import path from 'path';
import { RANKING_CRITERIA } from '../constants';

let parsedResorts: Resort[] = [];

export default function getResorts() {
	if (parsedResorts.length === 0) {
		parsedResorts = parseResorts(
			fs.readFileSync(path.join(process.cwd(), 'db', 'resorts.json'), 'utf-8')
		);
	}
	return parsedResorts;
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
