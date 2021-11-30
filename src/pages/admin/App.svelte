<script lang="ts">
	import "smelte/src/tailwind.css";
	import { NavigationDrawer, List, Snackbar, Button } from 'smelte';
	import Header from '../../components/Header.svelte';
	import Form from '../../components/Form.svelte';
	import type { Field } from '../../types';
	import { addDepo, downloadEvents } from './api';
	import { tokenExists } from '../../util';

	if(!tokenExists()) {
		window.location.href = '/pages/login/index.html';
	}

	enum Item {
		None = -1,
		AddDepo = 0,
		GetEvents = 1,
	}

	const items = [
		{ id: Item.AddDepo, text: 'Добавление департамента' },
		{ id: Item.GetEvents, text: 'Текущие мероприятия' },
	];

	var depoFields: Field[] = [
		{ name: "Название",             what: { tag: "text", data: "" } },
		{ name: "Логин администратора", what: { tag: "text", data: "" } },
		{ name: "Пароль",               what: { tag: "text", data: "", hidden: true } },
		{ name: "Фамилия",              what: { tag: "text", data: "" } },
		{ name: "Имя",                  what: { tag: "text", data: "" } },
		{ name: "Отчество",             what: { tag: "text", data: "" } },
	];
	var depoAdding: Promise<any> = null;

	let selected: Item = Item.None;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<Header/>
<main class="mx-full">
	<NavigationDrawer>
		<List {items} bind:value={selected}/>
	</NavigationDrawer>
	<div class="w-1/2 mx-auto smth-idk p-4 mt-16">
	{#if selected == Item.AddDepo}
		<Form fields={depoFields} buttonText={"добавить департамент"} on:click={() => {
			depoAdding = addDepo(depoFields);
		}}/>
		{#if depoAdding}
			{#await depoAdding then value}
				<Snackbar value={true}>
					Департамент создан
				</Snackbar>
			{:catch}
				<Snackbar value={true}>
					Произошла ошибка
				</Snackbar>
			{/await}
		{/if}
	{:else if selected == Item.GetEvents}
		<h6 class="mt-4 mb-4">Скачать список текущих мероприятий</h6>
		<Button on:click={downloadEvents}>Скачать</Button>
	{:else}
	{/if}
	</div>
</main>

<style>
	.smth-idk {
		background-color: #fafafa;
	}

	:global(body) {
		background-color: #f3f3f5;
	}
</style>
