type Props = {};

export default function ResortInfoList({
	resorts,
	idToShow,
	didClose,
}: {
	resorts: Resort[];
	idToShow: string;
	didClose: () => void;
}) {
	if (!resorts.length) return null;
	return (
		<ul className="resorts-info-list">
			{resorts.map(
				({ id, name, country, url, score, altitude, difficulty }) => (
					<li
						key={id}
						style={{
							visibility: String(id) === idToShow ? 'visible' : 'hidden',
						}}
						className={String(id) === idToShow ? 'shake' : ''}
					>
						<div className="metabox flow-s">
							<dl className="flow-s">
								<div className="flow-s">
									<dt className="sr-only">Name</dt>
									<dd>{name}</dd>
									<dt className="sr-only">Country</dt>
									<dd>{country}</dd>
								</div>
								<div className="grid">
									<dt>Score</dt>
									<dd>{score.toFixed(2)}</dd>
									<dt>Altitude</dt>
									<dd>{altitude}</dd>
									<dt>Difficulty</dt>
									<dd>{difficulty.toFixed(2)}</dd>
									<dt className="sr-only">Website</dt>
								</div>
								<dd>
									<a href={url}>Website</a>
								</dd>
							</dl>
							<button type="button" onClick={didClose}>
								Close
							</button>
						</div>
					</li>
				)
			)}
		</ul>
	);
}
