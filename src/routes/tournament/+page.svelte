<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let tournaments: any[] = [];
	let tournamentTable: TableSource;

	function stringToDate(str: string) {
		let date = new Date(str);
		return date.toLocaleDateString('en-my', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function selectionHandler(e: any) {
		console.log(e);
		goto('/tournament/view/' + e.detail[0]);
	}

	onMount(async function () {
		tournaments = await APIService.getTournaments();
		console.log(tournaments);
		for (let i = 0; i < tournaments.length; i++) {
			// Tournament ID, take last 5 digits
			// tournaments[i].tournament_id = tournaments[i].tournament_id.substr(
			// 	tournaments[i].tournament_id.length - 5
			// );

			// Format Dates
			tournaments[i].start_dt = stringToDate(tournaments[i].start_dt);
			tournaments[i].end_dt = stringToDate(tournaments[i].end_dt);
			tournaments[i].last_register_dt = stringToDate(tournaments[i].last_register_dt);
		}
		tournamentTable = {
			// A list of heading labels.
			head: ['Name', 'Start date', 'End Date', 'Last Register Date'],
			// The data visibly shown in your table body UI.
			body: tableMapperValues(tournaments, [
				'tournament_name',
				'start_dt',
				'end_dt',
				'last_register_dt'
			]),
			// Optional: The data returned when interactive is enabled and a row is clicked.
			meta: tableMapperValues(tournaments, ['tournament_id'])
		};
	});
</script>

<div class="container h-full mx-auto flex flex-col gap-2 m-4">
	<div class="flex m-2">
		<div class="space-y-10 text-center flex flex-col items-center text-6xl">Tournaments</div>
		<a href="/tournament/create" class="btn variant-filled ml-auto">
			<span>Create</span>
			<span
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</span>
		</a>
	</div>
	{#if tournaments.length != 0}
		<Table source={tournamentTable} interactive={true} on:selected={selectionHandler} />
	{/if}
</div>

<style>
</style>
