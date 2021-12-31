import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import About from '../About';
import Header from '../Header';
import ResortsInfo from '../mountains/ResortsInfo';
import { MAX_RESORTS_DISPLAY } from '../constants';
import getResorts from '../mountains/getResorts';

const MainScene = dynamic(() => import('../mountains'), {
	ssr: false,
});

const SnowflakesScene = dynamic(() => import('../snowflakes'), {
	ssr: false,
});

const siteName = 'Let’s Ski!';
const description =
	'A ski lover’s experiment in creative coding and big data parsing.';
const url = 'https://lets-ski.roeybiran.com';

export default function Page({
	resortsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const regions = Array.from(
		new Set(
			(resortsData as Resort[])
				.reduce<string[]>(
					(prev, curr) => prev.concat(curr.continent, curr.country),
					[]
				)
				.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
		)
	);

	const [query, setQuery] = useState('');
	const [resorts, setResorts] = useState<Resort[]>([]);
	const [shownDetails, setShownDetails] = useState('');

	const initialResorts = resortsData.sort(
		(a: Resort, b: Resort) => b.score - a.score
	);

	useEffect(() => {
		if (!query) {
			setResorts([]);
			return;
		}
		const results = initialResorts
			.filter((x: Resort) => {
				return (
					query === x.country.toLowerCase() ||
					query === x.continent.toLowerCase()
				);
			})
			.slice(0, MAX_RESORTS_DISPLAY);
		setResorts(results);
	}, [query, initialResorts]);

	return (
		<>
			<Head>
				<title>{siteName}</title>
				<meta name="description" content={description} />
				<meta property="og:title" content={siteName} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={url} />
				<meta property="og:url" content={`${url}/og.jpg`} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:site_name" content={siteName} />
				<meta name="twitter:image:alt" content="Snowcapped mountains" />
			</Head>

			<main>
				{/* area1 */}
				<div className="flow">
					<header className="center">
						<Header
							regions={regions}
							onInput={(q) => {
								setQuery(q);
							}}
						/>
					</header>
				</div>

				{/* area2 */}
				<ResortsInfo
					resorts={resorts}
					idToShow={shownDetails}
					didClose={() => setShownDetails('')}
				/>

				{/* area3 */}
				<div>
					<MainScene resorts={initialResorts.slice(0, MAX_RESORTS_DISPLAY)} />
					{/* disclosure buttons */}
					<div>
						{resorts.map(({ name, id }) => (
							<button
								aria-label="More information"
								key={name + id}
								type="button"
								className="disclosure fadein"
								id={`resort-button-${name + id}`}
								onClick={() => {
									setShownDetails(String(id));
								}}
							>
								ⓘ
							</button>
						))}
					</div>
				</div>

				<SnowflakesScene />
			</main>

			<footer>
				<About />
			</footer>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	return { props: { resortsData: getResorts() } };
};
