import { WEATHER_API_KEY } from '$app/env/private';

export async function GET({ fetch, setHeaders }) {
	const data = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=33.7490&lon=-84.3880&units=imperial&appid=${WEATHER_API_KEY}`
	).then(res => res.json());

	setHeaders({
		'Cache-Control': 'public, max-age=0, s-maxage=300'
	});

	return Response.json(data);
}
