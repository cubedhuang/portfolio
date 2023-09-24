import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function GET({ fetch, setHeaders }) {
	const data = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=33.95&lon=-84.55&units=imperial&appid=${env.WEATHER_API_KEY}`
	).then(res => res.json());

	setHeaders({
		'Cache-Control': 'public, max-age=0, s-maxage=300'
	});

	return json(data);
}
