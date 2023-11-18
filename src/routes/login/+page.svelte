<script lang="ts">
	import { goto } from '$app/navigation';
	import { APIService } from '$lib/services/api.service';
	import { Stepper, Step, getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let email = '',
		password = '';

	async function login() {
		if (email == '' || password == '') {
			toastStore.trigger({
				message: 'Make sure that all fields are filled',
				background: 'variant-filled-error'
			});
		} else {
			let response = await APIService.login(email, password);
			console.log(response);
			if (response == '-1') {
				toastStore.trigger({
					message: 'Email or Password is incorrect',
					background: 'variant-filled-error'
				});
			} else {
				toastStore.trigger({
					message: 'Login Successful',
					background: 'variant-filled-success'
				});
				// TODO : JWT?
				localStorage.setItem('auth-id', response);
				goto('/tournament');
			}
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="text-3xl">Login</h1>
		<div class="w-full card p-6 text-token m-3">
			<Stepper on:complete={login}>
				<Step>
					<svelte:fragment slot="header">Email</svelte:fragment>
					<input bind:value={email} required class="input" type="email" placeholder="Email" />
				</Step>
				<Step>
					<svelte:fragment slot="header">Password</svelte:fragment>
					<input
						bind:value={password}
						required
						class="input"
						type="password"
						placeholder="Password"
					/>
				</Step>
			</Stepper>
		</div>
	</div>
</div>

<style>
</style>
