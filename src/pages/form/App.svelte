<script lang="ts">
	import "smelte/src/tailwind.css";
	import Header from '../../components/Header.svelte';
	import Form from '../../components/Form.svelte';
	import type { Field } from '../../types';
	import { sendForm } from './api';
	import { tokenExists } from '../../util';

	if(!tokenExists()) {
		window.location.href = '/pages/login/index.html';
	}

	let fields: Field[] = [
		{ name: "Тема",                               what: { tag: "text",      data: ""         } },
		{ name: "Суть события, информационный повод", what: { tag: "text",      data: ""         } },
		{ name: "Дата",                               what: { tag: "calendar",  data: new Date() } },
		{ name: "Место, время",                       what: { tag: "text",      data: ""         } },
		{ name: "Ответственное лицо по оргвопросам",  what: { tag: "text",      data: ""         } },
		{ name: "Официальный спикер",                 what: { tag: "text",      data: ""         } },
		{ name: "Ключевое событие",                   what: { tag: "yesno",     data: false      } },
		{ name: "С участием губернатора",             what: { tag: "yesno",     data: false      } },
		{ name: "Факт-лист",                          what: { tag: "file",      data: null       } }
	];
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<Header/>
<main class="p-4 mx-auto mt-16">
	<Form {fields} buttonText={"создать событие"} on:click={() => sendForm(fields)}/>
</main>

<style>
	main {
		width: 50%;
		background-color: #fafafa;
	}

	:global(body) {
		background-color: #f3f3f5;
	}
</style>
