// place files you want to import through the `$lib` alias in this folder.
import * as osu from 'osu-api-v2-js';
import { OSU_CLIENT_SECRET } from '$env/static/private';

const api = await osu.API.createAsync(45354, OSU_CLIENT_SECRET);
api.refresh_token_on_expires = true;

let screenshotLink: string;

export function getAPI() {
	return api;
}

export async function userCheck(name: string) {
	try {
		await api.getUser(name);

		return {
			success: true
		};
	} catch (error) {
		return {
			success: false
		};
	}
}

export async function getCountryFlag(countryCode: string) {
	const fetchCall = await fetch(`https://restcountries.com/v2/alpha/${countryCode}?fields=flag`);
	const data = await fetchCall.json();
	return await data;
}

export function hslToHex(h: number, s: number, l: number) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}
