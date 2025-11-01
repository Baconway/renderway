// place files you want to import through the `$lib` alias in this folder.
import * as osu from 'osu-api-v2-js';
import ENV from '$env/static/private';
console.log('did i do this right?');
export const api = osu.API.createAsync(45354, ENV.CLIENT_SECRET);
