import type { Field } from '../../types';

export async function login(fields: Field[]) {
	const data = fields.map(a => a.what.data);
	const response = await fetch('http://127.0.0.1:8000/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({login: data[0] as string, password: data[1] as string}),
	});
	if(!response.ok) throw new Error();
	const json = await response.json();
	document.cookie = "token=" + json['access_token'] + "; max-age=7200";
	window.location.href = "/pages/form";
}
