<script lang="ts">
	import { TextField, Switch, Button, DatePicker } from "smelte";
	import type { Field } from '../types';

	export let fields: Field[];
	export let buttonText: string;

	const filterCond = (a) => {
		switch(a.what.tag) {
		case "text":
			return a.what.data != "";
		case "calendar":
		case "yesno":
			return true;
		default:
			return a.what.data && a.what.data.files.length != 0;
		}
	};
</script>

{#each fields as field, i}
	{#if field.what.tag == "text"}
		<h6 class="mt-6">{field.name}</h6>
		<TextField label={field.name} type={field.what.hidden ? 'password' : undefined} bind:value={fields[i].what.data}/>
	{:else if field.what.tag == "yesno"}
		<Switch label={field.name} bind:value={fields[i].what.data} />
		<br/>
	{:else if field.what.tag == "file"}
		<h6 class="mt-6">{field.name}</h6>
		<label>
			<input type="file" bind:this={fields[i].what.data} on:change={(_) => { fields[i].what.data = fields[i].what.data; }}/>
			<Button on:click={() => field.what.data.click()}>
			{#if field.what.data && field.what.data.files.length != 0}
				{field.what.data.files[0].name}
			{:else}
				Прикрепить файл
			{/if}
			</Button>
		</label>
	{:else}
		<h6 class="mt-6">{field.name}</h6>
		<DatePicker label={field.name} bind:value={fields[i].what.data}/>
	{/if}
{/each}
<Button block disabled={fields.filter(filterCond).length != fields.length} on:click>{buttonText}</Button>

<style>
	input[type=file] {
		display: none;
	}
</style>
