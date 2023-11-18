<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let response: any;
	let tid: any;
	let joined: any;
	let playersReponse: any;
	const toastStore = getToastStore();

	onMount(async function () {
		let uid = localStorage.getItem('auth-id');
		tid = window.location.href.split('/')[5];

		response = await APIService.getTournament(tid);

		playersReponse = await APIService.getTournamentPlayers(tid);

		for (let i = 0; i < playersReponse.players.length; i++) {
			if (playersReponse.players[i].user_id == uid) {
				joined = true;
				break;
			}
			joined = false;
		}
	});

	async function join() {
		let joinResponse = await APIService.joinTournament(tid);
		joined = true;
		if (joinResponse.code == 0) {
			toastStore.trigger({
				message: 'Successfully joined tournament!',
				background: 'variant-filled-success'
			});
		} else if (joinResponse.code == 1) {
			toastStore.trigger({
				message: 'Email or Password is incorrect',
				background: 'variant-filled-error'
			});
		} else {
			toastStore.trigger({
				message: 'Internal Server Error',
				background: 'variant-filled-error'
			});
		}
	}
</script>

<div class="container h-full mx-auto flex flex-col gap-2 m-4">
	<div class="flex m-2 flex-col">
		{#if response != undefined}
			<div class="space-y-10 flex items-center text-6xl mb-5">
				<p>
					{response.tournament.tournament_name}
				</p>
				{#if joined != undefined}
					{#if joined != true}
						<button on:click={join} class="ml-auto mt-0 btn variant-filled-tertiary justify-center">
							Join Tournament
						</button>
					{:else}
						<button class="ml-auto mt-0 btn variant-filled-tertiary justify-center">
							Joined ✓</button
						>
					{/if}
				{/if}
			</div>
			<div class="space-y-10 flex flex-coltext-xl flex-col">
				<div class="table-container">
					<!-- Native Table Element -->
					<table class="table table-hover">
						<tbody>
							<tr>
								<td class="font-bold">Sport</td>
								<td>{response.tournament.sport}</td>
							</tr>
							<tr>
								<td class="font-bold">Dates</td>
								<td
									>{new Date(response.tournament.start_date).toLocaleString()} - {new Date(
										response.tournament.end_date
									).toLocaleString()}</td
								>
							</tr>
							<tr>
								<td class="font-bold">Last Register Date</td>
								<td>{new Date(response.tournament.last_register_date).toLocaleString()}</td>
							</tr>
							<tr>
								<td class="font-bold">Tournament Type</td>
								<td>{response.tournament.tournament_type}</td>
							</tr>
							<tr>
								<td class="font-bold">Address</td>
								<td
									><p>{response.address.name}</p>
									<p>{response.address.address}</p></td
								>
							</tr>
							<tr>
								<td class="font-bold">No. of Courts</td>
								<td>{response.tournament.no_of_courts}</td>
							</tr>
							<tr>
								<td class="font-bold">Categories</td>
								<td
									>{#each response.categories as c}
										<p>{c.category_name} ({c.type})</p>
									{/each}</td
								>
							</tr>
							<tr>
								<td class="font-bold">Regulations</td>
								<td>{response.tournament.regulations}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div>
					<span class="text-xl font-bold">Players</span>
					<div class="flex flex-col">
						{#if playersReponse != undefined}
							{#each playersReponse.players as p, i}
								<span>{i + 1}. {p.first_name} {p.last_name}</span>
							{/each}
						{/if}
					</div>
					<div />
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
</style>
