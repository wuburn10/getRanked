<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let response: any;
	let tid: any;
	let joined: any;
	let playersReponse: any;
	let category: any;
	const toastStore = getToastStore();

	onMount(async function () {
		let uid = localStorage.getItem('auth-id');
		tid = window.location.href.split('/')[5];

		response = await APIService.getTournament(tid);

		playersReponse = await APIService.getTournamentPlayers(tid);

		if (playersReponse.length > 0){
			for (let i = 0; i < playersReponse.length; i++) {
				console.log(playersReponse[i].players)
				for (let j = 0; j < playersReponse[i].players.length; j++) {
					if (playersReponse[i].players[j].user_id == uid) {
						joined = true;
						break;
					}
				}
			}
		}else{
			joined = false;
		}

		
	});

	async function join() {
		if (category != undefined && category != ""){
			let joinResponse = await APIService.joinTournament(tid, category);
			joined = true;
			if (joinResponse.code == 0) {
				toastStore.trigger({
					message: 'Successfully joined tournament!',
					background: 'variant-filled-success'
				});	
			} else if (joinResponse.code == 1) {
				toastStore.trigger({
					message: 'Failed to join tournament',
					background: 'variant-filled-error'
				});
			} else {
				toastStore.trigger({
					message: 'Internal Server Error',
					background: 'variant-filled-error'
				});
			}
		}
	}
</script>

<div class="container h-full mx-auto flex flex-col gap-2 m-4">
	<div class="flex m-2 flex-col">
		{#if response != undefined}
			<div class=" flex items-center text-6xl mb-5">
				<p>
					{response.tournament.tournament_name}
				</p>
			</div>
			<div class="space-y-10 flex flex-coltext-xl flex-col">
				<div class="table-container">
					<!-- Native Table Element -->
					<table class="table table-hover">
						<tbody>
							<tr>
								<td class="font-bold">Sport</td>
								<td class="capitalize">{response.tournament.sport}</td>
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
								<td class="capitalize">{response.tournament.tournament_type}</td>
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
				<div class="flex justify-end">
					<div class="ml-2">
						{#if joined != undefined}
							{#if joined != true}
								<select class="select w-48" bind:value={category}>
									<option value="" selected disabled>Category</option>
									{#each response.categories as c}
										<option value="{c.category_id}">{c.category_name} ({c.type})</option>
									{/each}
								</select>
								<button on:click={join} class="ml-auto mt-0 btn variant-filled-tertiary justify-center">
									Join Tournament
								</button>
							{:else}
								<button class="ml-auto mt-0 btn variant-filled-tertiary justify-center">
									Joined  ✓</button
								>
							{/if}
						{/if}
					</div>
				</div>
				<div>
					<span class="text-2xl font-bold underline">Players</span>
					<div class="flex flex-col">
						{#if playersReponse != undefined}
							{#if playersReponse.length <= 0}
								<span class="italic my-3">No registered players yet.</span>
							{:else}
								{#each playersReponse as c}
									<span class="font-bold text-xl">{c.category.category_name} ({c.category.type})</span>
									{#each c.players as p, i}
										<span class="text-lg">{i + 1}. {p.first_name} {p.last_name}</span>
									{/each}
								{/each}
							{/if}
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
