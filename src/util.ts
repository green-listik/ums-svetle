export function tokenExists(): boolean {
	return document.cookie.split('; ').map(a => a.split('=')).filter(a => a[0] == 'token').length != 0;
}

export function getToken(): string {
	return document.cookie.split('; ').map(a => a.split('=')).filter(a => a[0] == 'token')[0][1];
}
