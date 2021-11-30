import type { Event, Field } from '../../types';

function fieldsToReq(fields: Field[]): Event {
	const data = fields.map(a => a.what.data);
	return {
		theme: data[0] as string,
		reason: data[1] as string,
		date: Math.floor((data[2] as Date).getTime() / 1000),
		place: data[3] as string,
		res_person: data[4] as string,
		speaker: data[5] as string,
		isImportant: data[6] as boolean,
		isGubernator: data[7] as boolean,
		file_name: "",
	};
}

export async function sendForm(fields: Field[]) {
	const token = document.cookie.split('; ').map(a => a.split('=')).filter(a => a[0] == 'token')[0][1];
	var input = fields[8].what.data as HTMLInputElement;
	var formData = new FormData();
	formData.append("file", input.files[0]);
	var response = await fetch('http://192.168.43.129:8000/uploadfile', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		body: formData,
	});
	if(!response.ok) throw new Error();
	var req = fieldsToReq(fields);
	req.file_name = input.files[0].name;
	response = await fetch('http://192.168.43.129:8000/add_event', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
		body: JSON.stringify(req),
	});
	if(!response.ok) throw new Error();
}