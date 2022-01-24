import Head from 'next/head';

const siteName = 'Let’s Ski!';
const description =
	'A ski lover’s experiment in creative coding and big data parsing.';
const url = 'https://lets-ski.roeybiran.com';

export default function DefaultHead() {
	return (
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
	);
}
