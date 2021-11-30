<script lang="ts">
	import "smelte/src/tailwind.css";
	import { login } from './api';
	import Form from '../../components/Form.svelte';
	import Header from '../../components/Header.svelte';
	import type { Field } from '../../types';

	var fields: Field[] = [
		{ name: "Логин",  what: { tag: "text", data: "" } },
		{ name: "Пароль", what: { tag: "text", data: "", hidden: true } },
	];
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<Header/>
<main class="p-4 mx-auto mt-16">
	<Form {fields} buttonText={"Вход"} on:click={() => login(fields)}/>
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
