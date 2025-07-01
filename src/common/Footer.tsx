const MYURL = 'https://roeybiran.com';

export default function Footer() {
	return (
		<>
			<div className="site-footer center">
				<section className="flow center">
					<h2>How It Works</h2>
					<ul className="flow-s">
						<li>
							Searching for a country or continent yields the top 10 ski resorts
							in that area. The score is based on multiple criteria, like the
							quality of the snow and accommodations.
						</li>
						<li>A higher scoring resort will have a bigger snowcap.</li>
						<li>
							Resorts with greater average altitudes are represented by a higher
							mountain.
						</li>
						<li>
							Resorts with a greater average difficulty appear steeper. This is
							calculated by combining the lengths of slopes adequate to advanced
							skiers only, and expressing that as a fraction of the total ski
							area.
						</li>
					</ul>
				</section>
				<footer className="flow center">
					<div className="flow-s">
						<p>
							Built with <a href="https://p5js.org">p5.js</a> and{' '}
							<a href="https://nextjs.org">Next.js</a>. By{' '}
							<a href={MYURL}>Roey Biran.</a>
						</p>
					</div>
				</footer>
			</div>
		</>
	);
}
