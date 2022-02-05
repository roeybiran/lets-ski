import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Footer from '../common/Footer';
import ResortInfoList from '../common/ResortInfoList';
import getResorts from '../mountains/getResorts';

const Mountains = dynamic(() => import('../mountains'), {
	ssr: false,
});

const Snowflakes = dynamic(() => import('../snowflakes'), {
	ssr: false,
});

const placeholderValue = 'Please choose a region';
const MAX_RESORTS_DISPLAY = 10;

export default function Page({
	regions,
	resorts,
	initialResorts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [shownResorts, setShownResorts] = useState<Resort[]>([]);
	const [shownDetails, setShownDetails] = useState('');
	return (
		<>
			<div id="above-fold">
				<div>
					<div id="top-bar">
						<header>
							<h1 className="fadein">Let’s Ski!</h1>
						</header>
						<form>
							<label htmlFor="areas-list" className="sr-only">
								Find the top 10 ski resorts by region:
							</label>
							<select
								className="fadein"
								id="areas-list"
								name="areas"
								onChange={(e) => {
									e.preventDefault();
									const val: string = e.target.value.toLowerCase();
									if (val === placeholderValue.toLowerCase()) {
										return;
									}
									const results = resorts
										.filter(
											(x) =>
												val === x.country.toLowerCase() ||
												val === x.continent.toLowerCase()
										)
										.slice(0, MAX_RESORTS_DISPLAY);
									setShownResorts(results);
								}}
							>
								{[placeholderValue].concat(regions).map((x) => (
									<option key={x} value={x}>
										{x}
									</option>
								))}
							</select>
						</form>
					</div>
				</div>
				<ResortInfoList
					resorts={shownResorts}
					idToShow={shownDetails}
					didClose={() => setShownDetails('')}
				/>
				<Mountains
					resorts={shownResorts.length ? shownResorts : initialResorts}
				/>
				{shownResorts.map(({ name, id }) => (
					<button
						key={name + id}
						aria-label="More information"
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
				<Snowflakes />
			</div>
			<Footer />
		</>
	);
}

export const getStaticProps = async () => {
	return {
		props: getResorts(),
	};
};
