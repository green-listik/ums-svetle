export type Event = {
	theme: string,
	reason: string,
	date: number,
	place: string,
	res_person: string,
	speaker: string,
	isImportant: boolean,
	isGubernator: boolean,
	file_name: string,
};

export type Depo = {
	name: string,
};

export type Text = {
	tag: "text",
	data: string,
	hidden?: boolean,
}

export type YesNo = {
	tag: "yesno",
	data: boolean,
}

export type File = {
	tag: "file",
	data: HTMLInputElement,
}

export type Calendar = {
	tag: "calendar",
	data: Date,
};

export type Field = {
	name: string,
	what: Text | YesNo | File | Calendar,
};
