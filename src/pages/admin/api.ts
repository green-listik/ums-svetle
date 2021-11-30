import type { Field } from '../../types';
import { getToken } from '../../util';

export async function addDepo(fields: Field[]) {
	const token = getToken();
	const data = fields.map(a => a.what.data as string);
	var response = await fetch('http://127.0.0.1:8000/add_depo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		body: JSON.stringify({name: data[0]}),
	});
	if(!response.ok) throw new Error();
	const depo_id = await response.json();
	console.log(depo_id);
	response = await fetch('http://127.0.0.1:8000/add_user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		body: JSON.stringify({
			"depo_id": depo_id,
			login: data[1],
			password: data[2],
			last_name: data[3],
			first_name: data[4],
			second_name: data[5],
			edit_events: true,
			edit_users: true,
			admin_service: false,
		}),
	});
	if(!response.ok) throw new Error();
}

export async function downloadEvents() {
	const token = getToken();
	var response = await fetch('http://127.0.0.1:8000/get_zip', { headers: {
		'Authorization': 'Bearer ' + token,
	}});
	if(!response.ok) throw new Error();
	window.location.assign(window.URL.createObjectURL(await response.blob()));
}
